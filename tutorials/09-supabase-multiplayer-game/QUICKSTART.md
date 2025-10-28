# Quick Start Guide - Crewmate Crisis

## Prerequisites (Required)

- [ ] Docker Desktop installed and running
- [ ] Node.js 18+ installed
- [ ] Go 1.25+ installed
- [ ] direnv installed (`brew install direnv` on macOS)

## Step 1: Install and START Docker Desktop

### macOS:

```bash
# Option A: Via Homebrew
brew install --cask docker

# Option B: Download directly
# Visit: https://www.docker.com/products/docker-desktop
```

### IMPORTANT: Start Docker Desktop!

```bash
# macOS: Start Docker Desktop app
open -a Docker

# Wait ~30 seconds for Docker to fully start
```

### Verify Docker is running:

```bash
docker --version  # Should show version
docker ps        # Should NOT error (shows running containers)
```

If `docker ps` gives an error, Docker isn't running yet. Wait and try again.

## Step 2: Install Supabase CLI

```bash
# macOS via Homebrew
brew install supabase/tap/supabase

# Or via npm (all platforms)
npm install -g supabase
```

## Step 3: Start Supabase Docker Containers

```bash
# Navigate to project
cd tutorials/09-supabase-multiplayer-game

# Initialize Supabase (creates .supabase folder)
supabase init

# START THE DOCKER CONTAINERS
# This command downloads and runs all Supabase services in Docker
supabase start
```

**What `supabase start` does:**
- Downloads Docker images (~1.5GB first time only)
- Starts 8+ Docker containers (PostgreSQL, Realtime, Auth, etc.)
- Takes 3-5 minutes on first run
- Subsequent starts take ~30 seconds

**Verify Docker containers are running:**
```bash
# Check that containers are running
docker ps

# You should see containers like:
# supabase_db_crewmate-crisis
# supabase_auth_crewmate-crisis
# supabase_realtime_crewmate-crisis
# ... and more
```

## Step 4: Save Your Keys

After `supabase start` completes, you'll see output like:

```
Started supabase local development setup.

         API URL: http://127.0.0.1:54321
     GraphQL URL: http://127.0.0.1:54321/graphql/v1
  S3 Storage URL: http://127.0.0.1:54321/storage/v1/s3
         MCP URL: http://127.0.0.1:54321/mcp
    Database URL: postgresql://postgres:postgres@127.0.0.1:54322/postgres
      Studio URL: http://127.0.0.1:54323
     Mailpit URL: http://127.0.0.1:54324
 Publishable key: sb_publishable_xxxxxxxxxxxxxxxxxxxxx
      Secret key: sb_secret_xxxxxxxxxxxxxxxxxxxxxxxxx
   S3 Access Key: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   S3 Secret Key: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
       S3 Region: local
```

**📝 COPY THESE KEYS - YOU NEED THEM!**

Note the changes:
- Now uses `127.0.0.1` instead of `localhost`
- `Publishable key` = what used to be `anon key`
- `Secret key` = what used to be `service_role key`
- `Mailpit` replaced `Inbucket` for email testing

## Step 5: Configure Environment

Create `.envrc` file:

```bash
# Create from template
cp .envrc.example .envrc
```

Edit `.envrc` with your actual keys:

```bash
export SUPABASE_URL=http://127.0.0.1:54321
export SUPABASE_ANON_KEY=sb_publishable_xxxxx...  # Your Publishable key
export SUPABASE_SERVICE_KEY=sb_secret_xxxxx...     # Your Secret key
export PORT=8080
export GO_ENV=development
```

Load environment:
```bash
direnv allow
```

## Step 6: Setup Database

Run migrations to create game tables:

```bash
supabase db reset
```

## Step 7: Update Frontend

Edit `static/app.js` line 2-3:

```javascript
const SUPABASE_URL = 'http://127.0.0.1:54321';
const SUPABASE_ANON_KEY = 'sb_publishable_xxxxx...'; // Your Publishable key
```

## Step 8: Install Go Dependencies

```bash
go mod download
# or
go get ./...
```

## Step 9: Start the Game Server

```bash
# Use the simplified version that works with PostgreSQL directly
go run main-simple.go

# Or if you have issues with the Supabase Go SDK:
go build -o game-server main-simple.go
./game-server
```

You should see:
```
🚀 Server starting on port 8080
📡 Supabase URL: http://localhost:54321
🎮 Game UI: http://localhost:8080
🗄️  Supabase Studio: http://localhost:54323
```

## Step 10: Play the Game!

1. Open http://localhost:8080 in multiple browser windows
2. Create a room in one window
3. Join with room code in other windows (need 3+ players)
4. Start game and enjoy!

## Quick Commands Reference

```bash
# START Docker containers (Supabase services)
supabase start  # This starts all Docker containers

# Then start your Go game server
go run main.go

# STOP Docker containers
supabase stop  # This stops all Docker containers

# Check what's running
supabase status      # Supabase services status
docker ps           # See actual Docker containers
docker ps | grep supabase  # See only Supabase containers

# Reset database
supabase db reset

# View Docker logs
docker logs supabase_db_crewmate-crisis

# Restart everything
supabase stop && supabase start
```

## Services Running

Once started, you have access to:

| Service | URL | Description |
|---------|-----|-------------|
| Game | http://localhost:8080 | Your multiplayer game |
| Supabase Studio | http://127.0.0.1:54323 | Database UI |
| API | http://127.0.0.1:54321 | REST/GraphQL API |
| Mailpit | http://127.0.0.1:54324 | Email testing |
| S3 Storage | http://127.0.0.1:54321/storage/v1/s3 | File storage |

## Troubleshooting

### Docker not running?
```bash
# macOS: Start Docker Desktop from Applications
open -a Docker

# Verify it's running
docker ps
```

### Port already in use?
```bash
# Check what's using the port
lsof -i :54321  # or any port number

# Stop Supabase and restart
supabase stop
supabase start
```

### Can't connect to Supabase?
```bash
# Check all containers are running
docker ps

# Should see containers like:
# - supabase_db_crewmate-crisis
# - supabase_auth_crewmate-crisis
# - supabase_realtime_crewmate-crisis
# - etc.
```

### Reset everything:
```bash
supabase stop --no-backup
docker system prune -a  # Warning: removes all Docker data
supabase start
```

## One-Line Quick Start

If you've done this before and just need the commands:

```bash
# Make sure Docker Desktop is running first!
open -a Docker  # macOS: start Docker Desktop

# Then run everything (this starts Docker containers via supabase)
supabase init && supabase start && supabase db reset && direnv allow && go run main.go
```

## Understanding the Architecture

```
Docker Desktop (must be running)
    ↓
Supabase CLI (`supabase start`)
    ↓
Starts these Docker containers:
    - PostgreSQL (port 54322)
    - PostgREST API (port 54321)
    - Realtime WebSocket (port 54324)
    - Auth Service (port 54328)
    - Storage Service (port 54327)
    - Studio Web UI (port 54323)
    - Kong API Gateway
    - GoTrue Auth
    ↓
Your Go Server (port 8080)
    ↓
Browser Game UI
```

## Database Monitoring for Teaching

### 🎓 Instructor's Guide - Show Your Students the Database in Action!

When running the game with your students, open these tools to demonstrate real-time database operations:

#### 1. Supabase Studio (Database UI)
Open **http://127.0.0.1:54323** in a separate browser window

**Tables to Monitor:**
1. **`players` table** - Watch new rows appear when students join
   - Shows: id, username, avatar_color, created_at
   - Demo: Each player joining creates a new record

2. **`game_rooms` table** - See room creation and status changes
   - Shows: id, room_code, host_id, status, impostor_id
   - Demo: Status changes from 'waiting' → 'playing' when game starts
   - Demo: impostor_id gets populated on game start

3. **`room_players` table** - Junction table showing who's in which room
   - Shows: room_id, player_id, is_alive, tasks_completed
   - Demo: New entries when players join rooms

4. **`messages` table** - Real-time chat messages
   - Shows: id, room_id, player_id, content, created_at
   - Demo: New rows appear instantly when players send messages

5. **`votes` table** - Voting records during meetings
   - Shows: id, room_id, voter_id, suspect_id, round
   - Demo: Records appear as players vote

#### 2. SQL Queries to Run Live

Open the SQL Editor in Supabase Studio (http://127.0.0.1:54323/project/default/sql) and run these queries:

```sql
-- Show all active players in real-time
SELECT p.username, p.avatar_color, gr.room_code, gr.status
FROM players p
JOIN room_players rp ON p.id = rp.player_id
JOIN game_rooms gr ON rp.room_id = gr.id
ORDER BY p.created_at DESC;

-- Show current game status
SELECT room_code, status,
       COUNT(DISTINCT rp.player_id) as player_count
FROM game_rooms gr
LEFT JOIN room_players rp ON gr.id = rp.room_id
GROUP BY gr.id, gr.room_code, gr.status
ORDER BY gr.created_at DESC;

-- Watch messages appear in real-time
SELECT m.content, p.username, m.created_at
FROM messages m
JOIN players p ON m.player_id = p.id
ORDER BY m.created_at DESC
LIMIT 10;
```

#### 3. Terminal Monitoring

Keep these terminal windows open to show backend activity:

**Window 1 - Docker Containers:**
```bash
# Show all running containers
docker ps | grep supabase

# Watch PostgreSQL logs
docker logs -f supabase_db_09-supabase-multiplayer-game
```

**Window 2 - Go Server:**
```bash
# Run the server with visible logs
go run main.go
# Shows API requests as they happen
```

**Window 3 - Database Direct Access:**
```bash
# Connect directly to PostgreSQL
psql "postgresql://postgres:postgres@127.0.0.1:54322/postgres?sslmode=disable"

# Then run:
\dt  # List all tables
SELECT * FROM game_rooms;  # Check game rooms
\watch 2  # Auto-refresh every 2 seconds
```

#### 4. Browser Developer Tools

Have students open Developer Tools (F12) to see:
- **Network Tab**: WebSocket connection attempts and HTTP API calls
- **Console**: Real-time subscription status and game events
- **Application Tab**: Local storage and session data

### Teaching Points to Highlight:

1. **CRUD Operations**:
   - CREATE: New player joins (INSERT into players)
   - READ: Loading room data (SELECT from game_rooms)
   - UPDATE: Game status changes (UPDATE game_rooms SET status='playing')
   - DELETE: Player leaves (could add this feature)

2. **Relationships**:
   - One-to-Many: game_rooms → players (host_id)
   - Many-to-Many: players ↔ game_rooms (via room_players)

3. **Real-time Features**:
   - Show how WebSocket subscriptions work (or polling fallback)
   - Demonstrate pub/sub pattern with room channels

4. **Data Integrity**:
   - Foreign key constraints (can't add player to non-existent room)
   - Unique constraints (room codes must be unique)

5. **Performance**:
   - Indexes on frequently queried columns
   - Connection pooling in the Go server

### Quick Demo Script:

1. **Start everything** and show Docker containers running
2. **Open Supabase Studio** - show empty tables
3. **First student creates room** - show new records in players and game_rooms
4. **Other students join** - watch room_players table grow
5. **Start game** - see status change and impostor assignment
6. **Send chat messages** - watch messages table update in real-time
7. **Call emergency meeting** - demonstrate voting system
8. **Run SQL queries** to show aggregate data (player counts, game statistics)

## Next Steps

- Open Supabase Studio at http://127.0.0.1:54323 to explore your database
- Monitor real-time updates in the browser console
- Check the full README.md for game mechanics and architecture details