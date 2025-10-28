package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"math/rand"
	"net"
	"net/http"
	"os"
	"time"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
)

type Server struct {
	db    *sql.DB
	rooms map[string]*GameRoom
}

type GameRoom struct {
	ID        string    `json:"id"`
	RoomCode  string    `json:"room_code"`
	HostID    string    `json:"host_id"`
	Status    string    `json:"status"`
	ImpostorID string   `json:"impostor_id,omitempty"`
	Players   []Player  `json:"players"`
	CreatedAt time.Time `json:"created_at"`
}

type Player struct {
	ID           string `json:"id"`
	Username     string `json:"username"`
	AvatarColor  string `json:"avatar_color"`
	IsAlive      bool   `json:"is_alive"`
	TasksCompleted int  `json:"tasks_completed"`
}

type CreateRoomRequest struct {
	Username    string `json:"username"`
	AvatarColor string `json:"avatar_color"`
}

type JoinRoomRequest struct {
	RoomCode    string `json:"room_code"`
	Username    string `json:"username"`
	AvatarColor string `json:"avatar_color"`
}

type VoteRequest struct {
	RoomID    string `json:"room_id"`
	VoterID   string `json:"voter_id"`
	SuspectID string `json:"suspect_id"`
	Round     int    `json:"round"`
}

func main() {
	// Environment variables are loaded via direnv
	// No need to load .env file

	// Connect to PostgreSQL database directly
	dbURL := "postgresql://postgres:postgres@127.0.0.1:54322/postgres?sslmode=disable"

	db, err := sql.Open("postgres", dbURL)
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	defer db.Close()

	// Test the connection
	if err := db.Ping(); err != nil {
		log.Fatalf("Failed to ping database: %v", err)
	}

	server := &Server{
		db:    db,
		rooms: make(map[string]*GameRoom),
	}

	// Setup routes
	r := mux.NewRouter()

	// API routes
	api := r.PathPrefix("/api").Subrouter()
	api.HandleFunc("/rooms", server.createRoom).Methods("POST")
	api.HandleFunc("/rooms/join", server.joinRoom).Methods("POST")
	api.HandleFunc("/rooms/{code}", server.getRoom).Methods("GET")
	api.HandleFunc("/rooms/{code}/start", server.startGame).Methods("POST")
	api.HandleFunc("/rooms/{code}/vote", server.submitVote).Methods("POST")
	api.HandleFunc("/rooms/{code}/task", server.completeTask).Methods("POST")
	api.HandleFunc("/rooms/{code}/emergency", server.callEmergency).Methods("POST")
	api.HandleFunc("/rooms/{code}/message", server.sendMessage).Methods("POST")
	api.HandleFunc("/rooms/{code}/messages", server.getMessages).Methods("GET")
	api.HandleFunc("/health", server.healthCheck).Methods("GET")

	// Supabase proxy for ngrok (avoids CORS issues)
	r.PathPrefix("/supabase-proxy/").HandlerFunc(server.proxySupabase)

	// Serve static files
	r.PathPrefix("/").Handler(http.FileServer(http.Dir("./static/")))

	// CORS middleware
	corsHandler := handlers.CORS(
		handlers.AllowedOrigins([]string{"*"}),
		handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}),
		handlers.AllowedHeaders([]string{"Content-Type", "Authorization"}),
	)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	httpsPort := os.Getenv("HTTPS_PORT")
	if httpsPort == "" {
		httpsPort = "8443"
	}

	localIP := getLocalIP()

	log.Printf("🚀 Server starting...")
	log.Printf("📡 Database connected: postgresql://127.0.0.1:54322")
	log.Printf("🗄️  Supabase Studio: http://127.0.0.1:54323")

	// Check if certificates exist for HTTPS
	certFile := "certs/server.crt"
	keyFile := "certs/server.key"

	if _, err := os.Stat(certFile); err == nil {
		// Start HTTPS server if certificates exist
		go func() {
			log.Printf("🔒 HTTPS Server: https://localhost:%s", httpsPort)
			log.Printf("📱 Secure network URL: https://%s:%s", localIP, httpsPort)
			log.Printf("✅ Students should use the HTTPS URL to avoid browser security blocks")

			if err := http.ListenAndServeTLS(":"+httpsPort, certFile, keyFile, corsHandler(r)); err != nil {
				log.Printf("HTTPS server error: %v", err)
			}
		}()
	} else {
		log.Printf("⚠️  No HTTPS certificates found. Run ./generate-cert.sh to enable HTTPS")
		log.Printf("📱 Chromebooks may block non-HTTPS connections!")
	}

	// Always start HTTP server
	log.Printf("🎮 HTTP Server: http://localhost:%s", port)
	log.Printf("📱 Local network URL: http://%s:%s", localIP, port)

	log.Fatal(http.ListenAndServe(":"+port, corsHandler(r)))
}

func (s *Server) healthCheck(w http.ResponseWriter, r *http.Request) {
	localIP := getLocalIP()
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	json.NewEncoder(w).Encode(map[string]interface{}{
		"status":     "healthy",
		"time":       time.Now().Format(time.RFC3339),
		"local_ip":   localIP,
		"local_url":  fmt.Sprintf("http://%s:%s", localIP, port),
		"port":       port,
	})
}

// proxySupabase forwards requests to Supabase to avoid CORS issues with ngrok
func (s *Server) proxySupabase(w http.ResponseWriter, r *http.Request) {
	// Handle OPTIONS requests for CORS preflight
	if r.Method == "OPTIONS" {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH")
		w.Header().Set("Access-Control-Allow-Headers", "*")
		w.WriteHeader(http.StatusOK)
		return
	}

	// Strip the /supabase-proxy prefix
	targetPath := r.URL.Path[len("/supabase-proxy"):]

	// Construct the target URL to Supabase
	targetURL := fmt.Sprintf("http://localhost:54321%s", targetPath)
	if r.URL.RawQuery != "" {
		targetURL += "?" + r.URL.RawQuery
	}

	log.Printf("Proxying request: %s %s -> %s", r.Method, r.URL.Path, targetURL)

	// Create a new request
	proxyReq, err := http.NewRequest(r.Method, targetURL, r.Body)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Copy headers (skip ngrok-specific headers)
	for key, values := range r.Header {
		// Skip headers that might cause issues
		if key == "Ngrok-Skip-Browser-Warning" ||
		   key == "X-Forwarded-For" ||
		   key == "X-Forwarded-Proto" ||
		   key == "X-Forwarded-Host" {
			continue
		}
		for _, value := range values {
			proxyReq.Header.Add(key, value)
		}
	}

	// Add ngrok skip warning header to avoid interstitial page
	proxyReq.Header.Set("ngrok-skip-browser-warning", "true")

	// Make the request
	client := &http.Client{}
	resp, err := client.Do(proxyReq)
	if err != nil {
		log.Printf("Error making proxy request: %v", err)
		http.Error(w, err.Error(), http.StatusBadGateway)
		return
	}
	defer resp.Body.Close()

	// Set CORS headers first
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH")
	w.Header().Set("Access-Control-Allow-Headers", "*")

	// Copy response headers
	for key, values := range resp.Header {
		// Skip CORS headers from Supabase as we set our own
		if key == "Access-Control-Allow-Origin" ||
		   key == "Access-Control-Allow-Methods" ||
		   key == "Access-Control-Allow-Headers" {
			continue
		}
		for _, value := range values {
			w.Header().Add(key, value)
		}
	}

	// Copy status code
	w.WriteHeader(resp.StatusCode)

	// Copy response body
	_, err = io.Copy(w, resp.Body)
	if err != nil {
		log.Printf("Error copying response body: %v", err)
	}

	log.Printf("Proxy response: %d", resp.StatusCode)
}

func (s *Server) createRoom(w http.ResponseWriter, r *http.Request) {
	var req CreateRoomRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Generate unique room code
	roomCode := generateRoomCode()

	// Create player
	var playerID string
	err := s.db.QueryRow(`
		INSERT INTO players (username, avatar_color)
		VALUES ($1, $2)
		RETURNING id`,
		req.Username, req.AvatarColor).Scan(&playerID)

	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to create player: %v", err), http.StatusInternalServerError)
		return
	}

	// Create game room
	var roomID string
	err = s.db.QueryRow(`
		INSERT INTO game_rooms (room_code, host_id, status)
		VALUES ($1, $2, $3)
		RETURNING id`,
		roomCode, playerID, "waiting").Scan(&roomID)

	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to create room: %v", err), http.StatusInternalServerError)
		return
	}

	// Add player to room
	_, err = s.db.Exec(`
		INSERT INTO room_players (room_id, player_id, is_alive)
		VALUES ($1, $2, $3)`,
		roomID, playerID, true)

	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to add player to room: %v", err), http.StatusInternalServerError)
		return
	}

	// Return response
	response := map[string]interface{}{
		"room_id":   roomID,
		"room_code": roomCode,
		"player_id": playerID,
		"host":      true,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func (s *Server) joinRoom(w http.ResponseWriter, r *http.Request) {
	var req JoinRoomRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Find room by code
	var roomID string
	err := s.db.QueryRow(`
		SELECT id FROM game_rooms WHERE room_code = $1`,
		req.RoomCode).Scan(&roomID)

	if err == sql.ErrNoRows {
		http.Error(w, "Room not found", http.StatusNotFound)
		return
	} else if err != nil {
		http.Error(w, fmt.Sprintf("Failed to find room: %v", err), http.StatusInternalServerError)
		return
	}

	// Check if room is not full (max 10 players)
	var playerCount int
	err = s.db.QueryRow(`
		SELECT COUNT(*) FROM room_players WHERE room_id = $1`,
		roomID).Scan(&playerCount)

	if err != nil {
		http.Error(w, "Failed to check room capacity", http.StatusInternalServerError)
		return
	}

	if playerCount >= 10 {
		http.Error(w, "Room is full", http.StatusBadRequest)
		return
	}

	// Create player
	var playerID string
	err = s.db.QueryRow(`
		INSERT INTO players (username, avatar_color)
		VALUES ($1, $2)
		RETURNING id`,
		req.Username, req.AvatarColor).Scan(&playerID)

	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to create player: %v", err), http.StatusInternalServerError)
		return
	}

	// Add player to room
	_, err = s.db.Exec(`
		INSERT INTO room_players (room_id, player_id, is_alive)
		VALUES ($1, $2, $3)`,
		roomID, playerID, true)

	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to add player to room: %v", err), http.StatusInternalServerError)
		return
	}

	// Return response
	response := map[string]interface{}{
		"room_id":   roomID,
		"room_code": req.RoomCode,
		"player_id": playerID,
		"host":      false,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func (s *Server) getRoom(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	roomCode := vars["code"]

	// Get room details
	var roomID, hostID, status string
	var impostorID sql.NullString
	err := s.db.QueryRow(`
		SELECT id, host_id, status, impostor_id
		FROM game_rooms
		WHERE room_code = $1`,
		roomCode).Scan(&roomID, &hostID, &status, &impostorID)

	if err == sql.ErrNoRows {
		http.Error(w, "Room not found", http.StatusNotFound)
		return
	} else if err != nil {
		http.Error(w, fmt.Sprintf("Failed to get room: %v", err), http.StatusInternalServerError)
		return
	}

	// Get players in room
	rows, err := s.db.Query(`
		SELECT p.id, p.username, p.avatar_color, rp.is_alive, rp.tasks_completed
		FROM room_players rp
		JOIN players p ON rp.player_id = p.id
		WHERE rp.room_id = $1`,
		roomID)

	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to get players: %v", err), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var players []map[string]interface{}
	for rows.Next() {
		var id, username, avatarColor string
		var isAlive bool
		var tasksCompleted int

		err := rows.Scan(&id, &username, &avatarColor, &isAlive, &tasksCompleted)
		if err != nil {
			continue
		}

		player := map[string]interface{}{
			"id":             id,
			"username":       username,
			"avatar_color":   avatarColor,
			"is_alive":       isAlive,
			"tasks_completed": tasksCompleted,
		}
		players = append(players, player)
	}

	// Build response
	response := map[string]interface{}{
		"id":        roomID,
		"room_code": roomCode,
		"host_id":   hostID,
		"status":    status,
		"room_players": players,
	}

	if impostorID.Valid {
		response["impostor_id"] = impostorID.String
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func (s *Server) startGame(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	roomCode := vars["code"]

	// Get room ID
	var roomID string
	err := s.db.QueryRow(`
		SELECT id FROM game_rooms WHERE room_code = $1`,
		roomCode).Scan(&roomID)

	if err == sql.ErrNoRows {
		http.Error(w, "Room not found", http.StatusNotFound)
		return
	} else if err != nil {
		http.Error(w, "Failed to get room", http.StatusInternalServerError)
		return
	}

	// Get player IDs
	rows, err := s.db.Query(`
		SELECT player_id FROM room_players WHERE room_id = $1`,
		roomID)

	if err != nil {
		http.Error(w, "Failed to get players", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var playerIDs []string
	for rows.Next() {
		var playerID string
		rows.Scan(&playerID)
		playerIDs = append(playerIDs, playerID)
	}

	if len(playerIDs) < 3 {
		http.Error(w, "Need at least 3 players to start", http.StatusBadRequest)
		return
	}

	// Randomly select impostor
	rand.Seed(time.Now().UnixNano())
	impostorID := playerIDs[rand.Intn(len(playerIDs))]

	// Update room status and impostor
	_, err = s.db.Exec(`
		UPDATE game_rooms
		SET status = $1, impostor_id = $2
		WHERE id = $3`,
		"playing", impostorID, roomID)

	if err != nil {
		http.Error(w, "Failed to start game", http.StatusInternalServerError)
		return
	}

	response := map[string]interface{}{
		"status":      "playing",
		"impostor_id": impostorID,
		"message":     "Game started!",
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func (s *Server) submitVote(w http.ResponseWriter, r *http.Request) {
	var req VoteRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Record vote
	_, err := s.db.Exec(`
		INSERT INTO votes (room_id, voter_id, suspect_id, round)
		VALUES ($1, $2, $3, $4)`,
		req.RoomID, req.VoterID, req.SuspectID, req.Round)

	if err != nil {
		http.Error(w, "Failed to submit vote", http.StatusInternalServerError)
		return
	}

	// Check if all alive players have voted
	// This would trigger vote counting and elimination logic

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"status": "vote_recorded"})
}

func (s *Server) completeTask(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	_ = vars["code"] // roomCode unused for now

	var req struct {
		PlayerID string `json:"player_id"`
		TaskID   string `json:"task_id"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Update task completion count
	// This would include logic to check win conditions

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"status": "task_completed"})
}

func (s *Server) callEmergency(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	roomCode := vars["code"]

	// Trigger emergency meeting
	// This would broadcast to all players and start discussion phase

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"status":  "emergency_meeting",
		"room":    roomCode,
		"message": "Emergency meeting called!",
	})
}

func (s *Server) sendMessage(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	roomCode := vars["code"]

	var req struct {
		PlayerID string `json:"player_id"`
		Content  string `json:"content"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Get room ID from room code
	var roomID string
	err := s.db.QueryRow(`
		SELECT id FROM game_rooms WHERE room_code = $1`,
		roomCode).Scan(&roomID)

	if err != nil {
		http.Error(w, "Room not found", http.StatusNotFound)
		return
	}

	// Insert message into database
	var messageID string
	err = s.db.QueryRow(`
		INSERT INTO messages (room_id, player_id, content)
		VALUES ($1, $2, $3)
		RETURNING id`,
		roomID, req.PlayerID, req.Content).Scan(&messageID)

	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to send message: %v", err), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"status":     "message_sent",
		"message_id": messageID,
	})
}

func (s *Server) getMessages(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	roomCode := vars["code"]

	// Get room ID from room code
	var roomID string
	err := s.db.QueryRow(`
		SELECT id FROM game_rooms WHERE room_code = $1`,
		roomCode).Scan(&roomID)

	if err != nil {
		http.Error(w, "Room not found", http.StatusNotFound)
		return
	}

	// Get messages with player info
	rows, err := s.db.Query(`
		SELECT m.id, m.player_id, m.content, m.created_at, p.username, p.avatar_color
		FROM messages m
		JOIN players p ON m.player_id = p.id
		WHERE m.room_id = $1
		ORDER BY m.created_at ASC`,
		roomID)

	if err != nil {
		http.Error(w, "Failed to get messages", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	messages := make([]map[string]interface{}, 0)
	for rows.Next() {
		var id, playerID, content, username, avatarColor string
		var createdAt time.Time

		err := rows.Scan(&id, &playerID, &content, &createdAt, &username, &avatarColor)
		if err != nil {
			continue
		}

		message := map[string]interface{}{
			"id":           id,
			"player_id":    playerID,
			"content":      content,
			"created_at":   createdAt,
			"username":     username,
			"avatar_color": avatarColor,
		}
		messages = append(messages, message)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(messages)
}

func generateRoomCode() string {
	const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	code := make([]byte, 6)
	for i := range code {
		code[i] = letters[rand.Intn(len(letters))]
	}
	return string(code)
}

func getLocalIP() string {
	// Try to get the local IP address (non-loopback)
	addrs, err := net.InterfaceAddrs()
	if err != nil {
		return "127.0.0.1"
	}

	for _, address := range addrs {
		// Check the address type and if it is not a loopback then return it
		if ipnet, ok := address.(*net.IPNet); ok && !ipnet.IP.IsLoopback() {
			if ipnet.IP.To4() != nil {
				return ipnet.IP.String()
			}
		}
	}
	return "127.0.0.1"
}