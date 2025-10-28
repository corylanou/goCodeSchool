// Supabase configuration
// When using ngrok, we'll proxy through the game server to avoid CORS issues
// The game server will forward requests to Supabase locally

// Detect if we're running through ngrok (hostname ends with .ngrok-free.app)
const isNgrok = window.location.hostname.includes('ngrok');

// Use full URL with proxy path for ngrok
// Use direct connection for local development
const SUPABASE_URL = isNgrok
    ? `${window.location.protocol}//${window.location.host}/supabase-proxy`  // Full URL through game server proxy
    : 'http://localhost:54321'; // Direct connection for local dev

const SUPABASE_ANON_KEY = 'sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH';

console.log('🔌 Connecting to Supabase at:', SUPABASE_URL);

// Initialize Supabase client for auto-generated APIs
// Note: Realtime WebSockets may not work in local development
// Disable automatic reconnection to prevent console spam
const supabaseOptions = {
    realtime: {
        params: {
            eventsPerSecond: 10
        },
        reconnectAfterMs: () => null // Disable automatic reconnection
    }
};

// Add ngrok header if running through ngrok
if (isNgrok) {
    supabaseOptions.global = {
        headers: {
            'ngrok-skip-browser-warning': 'true'
        }
    };
}

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, supabaseOptions);

// Game state
let gameState = {
    playerId: null,
    playerName: '',
    playerColor: 'blue',
    roomId: null,
    roomCode: null,
    isHost: false,
    role: null,
    isAlive: true,
    currentRound: 1,
    taskProgress: 0,
    totalTasks: 5,
    players: [],
    subscriptions: null,  // Track active subscriptions
    pollingInterval: null // Track polling interval
};

// Screens
const screens = {
    welcome: document.getElementById('welcomeScreen'),
    lobby: document.getElementById('lobbyScreen'),
    game: document.getElementById('gameScreen'),
    gameOver: document.getElementById('gameOverScreen')
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    setupColorSelector();
    loadConnectionInfo();
});

function setupEventListeners() {
    // Welcome screen
    document.getElementById('createRoomBtn').addEventListener('click', createRoom);
    document.getElementById('joinRoomBtn').addEventListener('click', joinRoom);
    document.getElementById('username').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            if (document.getElementById('roomCodeInput').value) {
                joinRoom();
            } else {
                createRoom();
            }
        }
    });

    // Lobby screen
    document.getElementById('startGameBtn').addEventListener('click', startGame);

    // Game screen
    document.getElementById('emergencyBtn').addEventListener('click', callEmergency);
    document.getElementById('sendChatBtn').addEventListener('click', sendChat);
    document.getElementById('chatInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendChat();
    });
    document.getElementById('skipVoteBtn').addEventListener('click', () => submitVote(null));

    // Task checkboxes
    document.querySelectorAll('.task-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', updateTaskProgress);
    });

    // Game over screen
    document.getElementById('playAgainBtn').addEventListener('click', resetGame);
}

function setupColorSelector() {
    const colorButtons = document.querySelectorAll('.color-btn');
    colorButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            colorButtons.forEach(b => b.classList.remove('ring-4', 'ring-white'));
            btn.classList.add('ring-4', 'ring-white');
            gameState.playerColor = btn.dataset.color;
        });
    });
    // Select blue by default
    document.querySelector('[data-color="blue"]').classList.add('ring-4', 'ring-white');
}

async function loadConnectionInfo() {
    try {
        const response = await fetch('/api/health');
        const data = await response.json();

        const shareUrl = document.getElementById('shareUrl');
        if (shareUrl && data.local_url) {
            shareUrl.textContent = data.local_url;
        }
    } catch (error) {
        console.error('Failed to load connection info:', error);
        const shareUrl = document.getElementById('shareUrl');
        if (shareUrl) {
            shareUrl.textContent = window.location.href;
        }
    }
}

function copyShareUrl() {
    const shareUrl = document.getElementById('shareUrl');
    if (shareUrl) {
        const url = shareUrl.textContent;
        navigator.clipboard.writeText(url).then(() => {
            // Show feedback
            const originalText = shareUrl.textContent;
            shareUrl.textContent = 'Copied!';
            shareUrl.classList.add('text-yellow-400');
            setTimeout(() => {
                shareUrl.textContent = originalText;
                shareUrl.classList.remove('text-yellow-400');
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    }
}

function showScreen(screenName) {
    Object.values(screens).forEach(screen => screen.classList.add('hidden'));
    screens[screenName].classList.remove('hidden');
}

async function createRoom() {
    const username = document.getElementById('username').value.trim();
    if (!username) {
        alert('Please enter your name');
        return;
    }

    gameState.playerName = username;

    try {
        // Use Supabase's auto-generated API to create player
        const { data: player, error: playerError } = await supabase
            .from('players')
            .insert({
                username: username,
                avatar_color: gameState.playerColor
            })
            .select()
            .single();

        if (playerError) throw playerError;

        gameState.playerId = player.id;

        // Generate room code
        const roomCode = generateRoomCode();

        // Create game room using Supabase API
        const { data: room, error: roomError } = await supabase
            .from('game_rooms')
            .insert({
                room_code: roomCode,
                host_id: player.id,
                status: 'waiting'
            })
            .select()
            .single();

        if (roomError) throw roomError;

        gameState.roomId = room.id;
        gameState.roomCode = roomCode;
        gameState.isHost = true;

        // Add player to room
        const { error: joinError } = await supabase
            .from('room_players')
            .insert({
                room_id: room.id,
                player_id: player.id,
                is_alive: true
            });

        if (joinError) throw joinError;

        document.getElementById('roomCodeDisplay').textContent = roomCode;
        showScreen('lobby');

        // Subscribe to room updates using Supabase Realtime
        subscribeToRoomWithSupabase();

        // Show start button for host
        document.getElementById('startGameBtn').classList.remove('hidden');

    } catch (error) {
        console.error('Error creating room:', error);
        alert(`Failed to create room: ${error.message}`);
    }
}

function generateRoomCode() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += letters[Math.floor(Math.random() * letters.length)];
    }
    return code;
}

async function joinRoom() {
    const username = document.getElementById('username').value.trim();
    const roomCode = document.getElementById('roomCodeInput').value.trim().toUpperCase();

    if (!username || !roomCode) {
        alert('Please enter your name and room code');
        return;
    }

    gameState.playerName = username;
    gameState.roomCode = roomCode;

    try {
        // Find room by code using Supabase API
        const { data: rooms, error: roomError } = await supabase
            .from('game_rooms')
            .select('*')
            .eq('room_code', roomCode)
            .single();

        if (roomError || !rooms) {
            throw new Error('Room not found');
        }

        // Check if room is full
        const { count, error: countError } = await supabase
            .from('room_players')
            .select('*', { count: 'exact', head: true })
            .eq('room_id', rooms.id);

        if (count >= 10) {
            throw new Error('Room is full');
        }

        // Create player using Supabase API
        const { data: player, error: playerError } = await supabase
            .from('players')
            .insert({
                username: username,
                avatar_color: gameState.playerColor
            })
            .select()
            .single();

        if (playerError) throw playerError;

        // Add player to room
        const { error: joinError } = await supabase
            .from('room_players')
            .insert({
                room_id: rooms.id,
                player_id: player.id,
                is_alive: true
            });

        if (joinError) throw joinError;

        gameState.playerId = player.id;
        gameState.roomId = rooms.id;
        gameState.roomCode = roomCode;
        gameState.isHost = false;

        document.getElementById('roomCodeDisplay').textContent = roomCode;
        showScreen('lobby');

        // Subscribe to room updates using Supabase Realtime
        subscribeToRoomWithSupabase();

    } catch (error) {
        console.error('Error joining room:', error);
        alert(error.message || 'Failed to join room. Check the room code and try again.');
    }
}

// Keep the old polling function for fallback
// Removed old subscribeToRoom function - using subscribeToRoomWithSupabase instead

// Subscription management with Supabase - single attempt, then fallback to polling
function subscribeToRoomWithSupabase() {
    // Clean up any existing subscriptions/polling first
    cleanupSubscriptions();

    console.log('🎮 Setting up room updates (Supabase APIs with polling)...');

    // Skip Realtime WebSocket attempt to avoid console errors
    // Go straight to polling which works reliably
    startPollingUpdates();

    // Initial load of players
    updatePlayersList();
}

// Clean up function for subscriptions and polling
function cleanupSubscriptions() {
    // Clean up any existing polling intervals
    if (gameState.pollingInterval) {
        clearInterval(gameState.pollingInterval);
        gameState.pollingInterval = null;
    }

    // Clean up any Supabase channels (if they exist)
    if (gameState.subscriptions) {
        supabase.removeAllChannels();
        gameState.subscriptions = null;
    }
}

// Start polling using Supabase PostgREST APIs
function startPollingUpdates() {
    console.log('📊 Using Supabase PostgREST APIs with polling for real-time updates');

    // Main polling interval for room and player updates
    gameState.pollingInterval = setInterval(async () => {
        try {
            // Use Supabase API to check game status
            const { data: room, error } = await supabase
                .from('game_rooms')
                .select('status, impostor_id')
                .eq('id', gameState.roomId)
                .single();

            if (!error && room) {
                // Check if game started
                if (room.status === 'playing' && !gameState.role) {
                    gameState.impostorId = room.impostor_id; // Store impostor ID
                    gameState.role = room.impostor_id === gameState.playerId ? 'Impostor' : 'Crewmate';
                    console.log('🎮 Game started! Role:', gameState.role);
                    showScreen('game');
                    initializeGame();
                }

                // Update players list in lobby
                if (!screens.lobby.classList.contains('hidden')) {
                    await updatePlayersList();
                }

                // Update task progress if in game
                if (!screens.game.classList.contains('hidden') && room.status === 'playing') {
                    await updateOverallTaskProgress();

                    // Also check for voting completion if voting is active
                    if (!document.getElementById('votingArea').classList.contains('hidden')) {
                        await checkVotingComplete();
                    }
                }
            }

            // Poll for messages if in game screen
            if (!screens.game.classList.contains('hidden')) {
                const { data: messages } = await supabase
                    .from('messages')
                    .select('*, players!messages_player_id_fkey(username, avatar_color)')
                    .eq('room_id', gameState.roomId)
                    .order('created_at', { ascending: true })
                    .limit(50); // Limit messages to prevent overflow

                if (messages) {
                    const chatMessages = document.getElementById('chatMessages');
                    if (chatMessages && messages.length > chatMessages.children.length) {
                        chatMessages.innerHTML = '';
                        messages.forEach(msg => {
                            displayMessage({
                                ...msg,
                                username: msg.players?.username,
                                avatar_color: msg.players?.avatar_color
                            });
                        });
                        // Auto-scroll to bottom
                        chatMessages.scrollTop = chatMessages.scrollHeight;
                    }
                }
            }
        } catch (error) {
            // Silently handle errors to avoid console spam
            if (error.message && !error.message.includes('Failed to fetch')) {
                console.error('Update error:', error.message);
            }
        }
    }, 2000); // Poll every 2 seconds
}

function updatePlayersFromAPI(players, hostId) {
    const playersList = document.getElementById('playersList');
    playersList.innerHTML = '';

    if (players && players.length > 0) {
        gameState.players = players;

        players.forEach(player => {
            const playerDiv = document.createElement('div');
            playerDiv.className = 'bg-gray-700 rounded-lg p-4 text-center';

            const colorClass = `bg-${player.avatar_color}-500`;
            playerDiv.innerHTML = `
                <div class="w-16 h-16 ${colorClass} rounded-full mx-auto mb-2 player-avatar"></div>
                <p class="font-semibold">${player.username}</p>
                ${player.id === hostId ? '<span class="text-xs text-yellow-400">Host</span>' : ''}
            `;

            playersList.appendChild(playerDiv);
        });
    }
}

async function updatePlayersList() {
    try {
        // Use Supabase API to get room and players
        const { data: room, error: roomError } = await supabase
            .from('game_rooms')
            .select('*, room_players(*, players(*))')
            .eq('id', gameState.roomId)
            .single();

        if (roomError) throw roomError;

        const playersList = document.getElementById('playersList');
        playersList.innerHTML = '';

        if (room.room_players && room.room_players.length > 0) {
            // Transform data for gameState
            gameState.players = room.room_players.map(rp => ({
                id: rp.players.id,
                username: rp.players.username,
                avatar_color: rp.players.avatar_color,
                is_alive: rp.is_alive,
                tasks_completed: rp.tasks_completed
            }));

            room.room_players.forEach(rp => {
                const player = rp.players;
                const playerDiv = document.createElement('div');
                playerDiv.className = 'bg-gray-700 rounded-lg p-4 text-center';

                const colorClass = `bg-${player.avatar_color}-500`;
                playerDiv.innerHTML = `
                    <div class="w-16 h-16 ${colorClass} rounded-full mx-auto mb-2 player-avatar"></div>
                    <p class="font-semibold">${player.username}</p>
                    ${player.id === room.host_id ? '<span class="text-xs text-yellow-400">Host</span>' : ''}
                `;

                playersList.appendChild(playerDiv);
            });

            // Update start button visibility
            if (gameState.isHost && room.room_players.length >= 3) {
                document.getElementById('startGameBtn').textContent = `Start Game (${room.room_players.length} players)`;
                document.getElementById('startGameBtn').disabled = false;
            }
        }
    } catch (error) {
        console.error('Error updating players list:', error);
        // Fallback to old API if Supabase fails
        try {
            const response = await fetch(`/api/rooms/${gameState.roomCode}`);
            const room = await response.json();
            if (room.room_players) {
                updatePlayersFromAPI(room.room_players, room.host_id);
            }
        } catch (fallbackError) {
            console.error('Fallback also failed:', fallbackError);
        }
    }
}

async function startGame() {
    try {
        const response = await fetch(`/api/rooms/${gameState.roomCode}/start`, {
            method: 'POST'
        });

        if (!response.ok) {
            throw new Error('Failed to start game');
        }

        const data = await response.json();
        console.log('Game started:', data);

    } catch (error) {
        console.error('Error starting game:', error);
        alert('Failed to start game. Make sure you have at least 3 players.');
    }
}

function initializeGame() {
    // Display role
    document.getElementById('roleDisplay').textContent = gameState.role;

    if (gameState.role === 'Impostor') {
        document.getElementById('roleDisplay').classList.add('text-red-500');
        document.getElementById('taskList').classList.add('hidden');
    } else {
        document.getElementById('roleDisplay').classList.add('text-green-500');
        document.getElementById('taskList').classList.remove('hidden');
    }

    // Load game players
    updateGamePlayers();

    // Initialize task progress
    updateTaskProgress();

    // Start polling for messages (since WebSockets aren't working)
    setInterval(async () => {
        try {
            const response = await fetch(`/api/rooms/${gameState.roomCode}/messages`);
            if (response.ok) {
                const messages = await response.json();
                // Display new messages
                const chatMessages = document.getElementById('chatMessages');
                if (chatMessages && messages && messages.length > 0) {
                    // Only update if we have more messages than currently displayed
                    if (messages.length > chatMessages.children.length) {
                        // Clear and redisplay all messages
                        chatMessages.innerHTML = '';
                        messages.forEach(msg => displayMessage(msg));
                    }
                }
            }
        } catch (error) {
            // Silently ignore polling errors
        }
    }, 3000); // Poll every 3 seconds
}

function updateGamePlayers() {
    const gamePlayers = document.getElementById('gamePlayers');
    gamePlayers.innerHTML = '';

    gameState.players.forEach(player => {
        const playerDiv = document.createElement('div');
        playerDiv.className = 'text-center';

        const isAlive = player.is_alive !== false;
        const colorClass = `bg-${player.avatar_color}-500`;
        const opacity = isAlive ? '' : 'opacity-50';

        playerDiv.innerHTML = `
            <div class="w-12 h-12 ${colorClass} rounded-full mx-auto mb-1 player-avatar ${opacity}"></div>
            <p class="text-xs ${!isAlive ? 'line-through' : ''}">${player.username}</p>
        `;

        gamePlayers.appendChild(playerDiv);
    });
}

async function updateTaskProgress() {
    const completed = document.querySelectorAll('.task-checkbox:checked').length;
    const total = document.querySelectorAll('.task-checkbox').length;

    gameState.taskProgress = completed;
    gameState.totalTasks = total;

    // Update task progress in database via Supabase
    if (gameState.role === 'Crewmate') {
        try {
            const { error } = await supabase
                .from('room_players')
                .update({ tasks_completed: completed })
                .eq('room_id', gameState.roomId)
                .eq('player_id', gameState.playerId);

            if (error) {
                console.error('Error updating task progress:', error);
            } else {
                console.log(`📋 Task progress updated: ${completed}/${total}`);
            }
        } catch (error) {
            console.error('Error updating task progress:', error);
        }
    }

    // Update local UI
    updateTaskProgressBar(completed, total);

    // Check for crewmate win condition
    if (gameState.role === 'Crewmate' && completed === total) {
        // Send task completion to server
        completeAllTasks();
    }
}

function updateTaskProgressBar(completed, total) {
    const percentage = (completed / total) * 100;
    document.getElementById('taskProgressBar').style.width = `${percentage}%`;
    document.getElementById('taskCount').textContent = `${completed}/${total}`;
}

// Update overall task progress from all players
async function updateOverallTaskProgress() {
    try {
        // Get all players' task progress
        const { data: roomPlayers, error } = await supabase
            .from('room_players')
            .select('player_id, tasks_completed, players(username)')
            .eq('room_id', gameState.roomId);

        if (error) {
            console.error('Error fetching task progress:', error);
            return;
        }

        if (roomPlayers && roomPlayers.length > 0) {
            // Calculate total tasks completed by all crewmates
            let totalCompleted = 0;
            let totalTasks = 0;
            let crewmateCount = 0;

            roomPlayers.forEach(rp => {
                // Skip the impostor (they don't have real tasks)
                if (rp.player_id !== gameState.impostorId) {
                    totalCompleted += rp.tasks_completed || 0;
                    crewmateCount++;
                }
            });

            // Each crewmate has 5 tasks
            totalTasks = crewmateCount * 5;

            // Update the overall progress bar (only if we're not updating our own tasks)
            if (!document.activeElement.classList.contains('task-checkbox')) {
                updateTaskProgressBar(totalCompleted, totalTasks);
            }

            // Check for crewmate win condition
            if (totalCompleted >= totalTasks && totalTasks > 0) {
                console.log('🎉 All tasks completed! Crewmates win!');
                // The server will handle the win condition
            }
        }
    } catch (error) {
        console.error('Error updating overall task progress:', error);
    }
}

async function completeAllTasks() {
    try {
        await fetch(`/api/rooms/${gameState.roomCode}/task`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                player_id: gameState.playerId,
                task_id: 'all'
            })
        });
    } catch (error) {
        console.error('Error completing tasks:', error);
    }
}

async function callEmergency() {
    try {
        await fetch(`/api/rooms/${gameState.roomCode}/emergency`, {
            method: 'POST'
        });

        startVoting();
    } catch (error) {
        console.error('Error calling emergency:', error);
    }
}

function startVoting() {
    // Show voting UI
    document.getElementById('votingArea').classList.remove('hidden');
    document.getElementById('taskList').classList.add('hidden');

    // Create voting buttons
    const votingOptions = document.getElementById('votingOptions');
    votingOptions.innerHTML = '';

    gameState.players.forEach(player => {
        // Skip dead players (but allow voting for yourself in this version)
        if (player.is_alive === false) return;

        const voteBtn = document.createElement('button');
        voteBtn.className = 'bg-gray-600 hover:bg-gray-500 px-3 py-2 rounded-lg text-sm';
        voteBtn.innerHTML = `
            <div class="w-8 h-8 bg-${player.avatar_color}-500 rounded-full mx-auto mb-1"></div>
            <p>${player.username}</p>
        `;
        voteBtn.onclick = () => submitVote(player.id);

        votingOptions.appendChild(voteBtn);
    });
}

async function submitVote(suspectId) {
    try {
        // Submit vote to Supabase
        const { error } = await supabase
            .from('votes')
            .insert({
                room_id: gameState.roomId,
                voter_id: gameState.playerId,
                suspect_id: suspectId,
                round: gameState.currentRound
            });

        if (error) {
            console.error('Error submitting vote:', error);
            return;
        }

        console.log('Vote submitted:', suspectId ? 'for player' : 'skipped');

        // Disable voting after submitting
        document.getElementById('votingArea').classList.add('hidden');
        document.getElementById('statusMessage').textContent = 'Vote submitted. Waiting for others...';

        // Check if all alive players have voted
        await checkVotingComplete();

    } catch (error) {
        console.error('Error submitting vote:', error);
    }
}

// Check if all alive players have voted and process results
async function checkVotingComplete() {
    try {
        // Get all alive players
        const { data: alivePlayers, error: playersError } = await supabase
            .from('room_players')
            .select('player_id')
            .eq('room_id', gameState.roomId)
            .eq('is_alive', true);

        if (playersError) {
            console.error('Error getting alive players:', playersError);
            return;
        }

        // Get all votes for current round
        const { data: votes, error: votesError } = await supabase
            .from('votes')
            .select('voter_id, suspect_id')
            .eq('room_id', gameState.roomId)
            .eq('round', gameState.currentRound);

        if (votesError) {
            console.error('Error getting votes:', votesError);
            return;
        }

        console.log(`Votes: ${votes.length}/${alivePlayers.length}`);

        // Check if all alive players have voted
        if (votes.length >= alivePlayers.length) {
            console.log('All players have voted! Processing results...');
            await processVotingResults(votes);
        }
    } catch (error) {
        console.error('Error checking voting completion:', error);
    }
}

// Process voting results and eliminate player with most votes
async function processVotingResults(votes) {
    try {
        // Count votes for each suspect
        const voteCount = {};
        let skipVotes = 0;

        votes.forEach(vote => {
            if (vote.suspect_id) {
                voteCount[vote.suspect_id] = (voteCount[vote.suspect_id] || 0) + 1;
            } else {
                skipVotes++;
            }
        });

        // Find player with most votes
        let maxVotes = skipVotes;
        let eliminatedPlayerId = null;

        for (const [playerId, count] of Object.entries(voteCount)) {
            if (count > maxVotes) {
                maxVotes = count;
                eliminatedPlayerId = playerId;
            }
        }

        // If someone should be eliminated
        if (eliminatedPlayerId) {
            console.log('Player to be eliminated:', eliminatedPlayerId);

            // Mark player as not alive
            const { error: updateError } = await supabase
                .from('room_players')
                .update({ is_alive: false })
                .eq('room_id', gameState.roomId)
                .eq('player_id', eliminatedPlayerId);

            if (updateError) {
                console.error('Error eliminating player:', updateError);
                return;
            }

            // Get player info for announcement
            const { data: eliminatedPlayer } = await supabase
                .from('players')
                .select('username')
                .eq('id', eliminatedPlayerId)
                .single();

            // Check if eliminated player was the impostor
            if (eliminatedPlayerId === gameState.impostorId) {
                showGameOver(true, `${eliminatedPlayer.username} was the Impostor! Crewmates Win!`);
            } else {
                // Show elimination result and continue game
                document.getElementById('statusMessage').textContent =
                    `${eliminatedPlayer.username} was eliminated. They were a Crewmate.`;

                // Resume game after delay
                setTimeout(() => {
                    document.getElementById('votingArea').classList.add('hidden');
                    document.getElementById('statusMessage').textContent = 'Game continues...';
                    gameState.currentRound++;
                }, 3000);
            }
        } else {
            // No one eliminated (skip vote won)
            document.getElementById('statusMessage').textContent = 'No one was eliminated.';
            setTimeout(() => {
                document.getElementById('votingArea').classList.add('hidden');
                document.getElementById('statusMessage').textContent = 'Game continues...';
                gameState.currentRound++;
            }, 3000);
        }
    } catch (error) {
        console.error('Error processing voting results:', error);
    }
}

async function sendChat() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();

    if (!message) return;

    try {
        // Use Supabase API to insert message directly!
        const { data, error } = await supabase
            .from('messages')
            .insert({
                room_id: gameState.roomId,
                player_id: gameState.playerId,
                content: message
            })
            .select()
            .single();

        if (error) throw error;

        input.value = '';

        // The message will appear via Realtime subscription!
        console.log('Message sent via Supabase:', data);

    } catch (error) {
        console.error('Error sending message:', error);
        // Fallback to old API
        try {
            const response = await fetch(`/api/rooms/${gameState.roomCode}/message`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    player_id: gameState.playerId,
                    content: message
                })
            });
            if (response.ok) {
                input.value = '';
                displayMessage({
                    player_id: gameState.playerId,
                    content: message,
                    username: gameState.playerName,
                    avatar_color: gameState.playerColor,
                    created_at: new Date().toISOString()
                });
            }
        } catch (fallbackError) {
            console.error('Fallback also failed:', fallbackError);
        }
    }
}

function displayMessage(message) {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;

    // Use the username and avatar_color from message if available (from server)
    // Otherwise try to find from local players list
    let playerName = message.username;
    let playerColor = message.avatar_color;

    if (!playerName) {
        const playerInfo = gameState.players.find(p => p.id === message.player_id);
        playerName = playerInfo ? playerInfo.username : 'Unknown';
        playerColor = playerInfo ? playerInfo.avatar_color : 'gray';
    }

    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message bg-gray-800 rounded-lg p-2 mb-1';
    messageDiv.innerHTML = `
        <span class="font-semibold text-${playerColor}-400">${playerName}:</span>
        <span>${message.content}</span>
    `;

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function updateVoteCount() {
    // This would be called when votes are being counted
    // Update UI to show vote progress
}

function showGameOver(winner, message) {
    showScreen('gameOver');

    const title = document.getElementById('gameOverTitle');
    const msg = document.getElementById('gameOverMessage');

    if (winner === 'crewmates') {
        title.textContent = '✅ Crewmates Win!';
        title.className = 'text-3xl font-bold mb-4 text-green-500';
    } else {
        title.textContent = '💀 Impostor Wins!';
        title.className = 'text-3xl font-bold mb-4 text-red-500';
    }

    msg.textContent = message;
}

function resetGame() {
    // Clean up subscriptions and polling first
    cleanupSubscriptions();

    // Reset game state
    gameState = {
        playerId: null,
        playerName: '',
        playerColor: 'blue',
        roomId: null,
        roomCode: null,
        isHost: false,
        role: null,
        isAlive: true,
        currentRound: 1,
        taskProgress: 0,
        totalTasks: 5,
        players: [],
        subscriptions: null,
        pollingInterval: null
    };

    // Clear inputs
    document.getElementById('username').value = '';
    document.getElementById('roomCodeInput').value = '';

    // Show welcome screen
    showScreen('welcome');
}

// Error handling
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
});

// Connection status monitoring
supabase.getChannels().forEach(channel => {
    channel.on('system', {}, (payload) => {
        console.log('System event:', payload);
    });
});