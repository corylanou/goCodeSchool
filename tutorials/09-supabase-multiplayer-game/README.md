# Supabase Multiplayer Game Tutorial: Crewmate Crisis 🚀

## Overview

In this tutorial, we'll build **Crewmate Crisis**, a real-time multiplayer game inspired by Among Us, showcasing the **amazing features of Supabase** that make it perfect for modern app development:

### 🌟 Supabase Features We're Using:

1. **Auto-Generated REST APIs (PostgREST)**
   - Instant CRUD operations without writing backend code
   - Complex queries with relationships (`select('*, room_players(*, players(*))`)`)
   - No need to write SQL in the frontend!

2. **Real-time Database Subscriptions**
   - Live updates when players join/leave
   - Instant chat messages via WebSocket
   - Game state changes pushed to all clients
   - No polling needed!

3. **Row Level Security (RLS)**
   - Database-level access control
   - Secure by default with policies

4. **Supabase JavaScript Client**
   - Type-safe database queries
   - Built-in retry and error handling
   - Automatic token management

5. **Local Development with Docker**
   - Full Supabase stack running locally
   - Same APIs as production
   - Supabase Studio for database management

## 🎮 How to Play Crewmate Crisis

### Game Objective
- **Crewmates (Good Guys)**: Complete all tasks OR identify and vote out the impostor
- **Impostor (Bad Guy)**: Eliminate crewmates without being caught

### Game Flow

1. **Lobby Phase**
   - First player creates a room and gets a 6-letter code
   - Other players join using the room code
   - Need minimum 3 players to start (more fun with 4-8 players)
   - Host clicks "Start Game" when ready

2. **Game Start**
   - One player is randomly selected as the **Impostor** (shown in red)
   - Everyone else is a **Crewmate** (shown in green)
   - Only YOU can see your role - it's secret!

3. **Playing the Game**

   **As a Crewmate:**
   - Check off tasks in your task list (these are simulated)
   - Watch the task progress bar - when it's full, crewmates win!
   - Pay attention to who's NOT doing tasks (might be the impostor)
   - Call emergency meetings if you suspect someone
   - Use chat to discuss suspicions

   **As an Impostor:**
   - Pretend to do tasks (you don't have a real task list)
   - Try to "eliminate" crewmates when others aren't watching
   - Blend in during discussions
   - Cast doubt on innocent players
   - Win by eliminating enough crewmates

4. **Emergency Meetings**
   - Any player can call an emergency meeting with the red button
   - During voting:
     - Discuss who you think the impostor is in chat
     - Vote for who to eject from the ship
     - Or skip vote if unsure
   - Player with most votes gets ejected
   - If impostor is ejected = Crewmates win!
   - If crewmate is ejected = Game continues

5. **Winning Conditions**
   - **Crewmates Win**:
     - All tasks completed (progress bar reaches 100%)
     - OR impostor is voted out
   - **Impostor Wins**:
     - Number of impostors equals number of crewmates
     - OR crewmates fail to complete tasks in time

### Strategy Tips

**For Crewmates:**
- Actually click tasks to show you're working
- Watch who avoids tasks or fakes them
- Stay in groups for safety
- Report suspicious behavior quickly
- Use logic in discussions ("I saw X near Y before they died")

**For Impostor:**
- Pretend to do tasks by standing near them
- Create alibis ("I was with player X")
- Sabotage discussions with false accusations
- Vote with the majority to avoid suspicion
- Act shocked when bodies are reported

### Current Implementation Status

✅ **Working Features:**
- Room creation and joining
- Role assignment (impostor/crewmate)
- Task list and progress tracking
- Emergency meetings and voting
- Chat system
- Player avatars and colors

🚧 **Simplified for Teaching (Not Yet Implemented):**
- Impostor elimination mechanic (killing)
- Dead body reporting
- Vision limitation
- Sabotage system
- Multiple rounds
- Sound effects and animations

This simplified version focuses on the **voting and deduction** aspect of the game, making it perfect for demonstrating database operations, real-time updates, and multiplayer interactions in a classroom setting!

## Why Supabase for Modern App Development?

Supabase provides several key advantages:

1. **Real-time Database Updates**: Automatically sync data across all connected clients
2. **Built-in Authentication**: Handle user sessions without writing auth code
3. **PostgreSQL Power**: Full SQL database with Row Level Security
4. **Local Development**: Complete development stack runs locally
5. **Instant APIs**: Auto-generated REST and GraphQL APIs from your schema
6. **WebSocket Management**: No need to manage WebSocket connections manually

### 🎓 Supabase Free Tier - Perfect for Students!

Supabase offers a generous **free tier that's perfect for learning and development**:

**What You Get for Free:**
- ✅ **2 active projects** - Perfect for a main project and testing
- ✅ **500MB database storage** - Plenty for learning projects
- ✅ **1GB file storage** - Store images, documents, etc.
- ✅ **10,000 monthly active users** - More than enough for class projects
- ✅ **Full Realtime and Auth features** - All the core functionality
- ✅ **Community support** - Active Discord and GitHub communities
- ✅ **Edge Functions** - Limited usage for serverless functions
- ✅ **Free forever** - No time limit, no credit card required!

**Important Notes for Students:**
- Projects are **paused after 1 week of inactivity** (but you can unpause them easily)
- Paused projects don't count toward your 2-project limit
- No automatic backups on free tier (but you can export your data manually)
- Perfect for coursework, portfolios, and side projects

**When to Consider Upgrading:**
- The Pro plan ($25/month) is only needed for production apps with:
  - More storage requirements
  - Need for automatic backups
  - Email support
  - Higher usage limits

**Bottom Line:** The free tier gives you everything you need to learn full-stack development with a real production-grade database!

## Prerequisites

- Node.js (v18+) and npm
- Go 1.25+
- direnv installed (`brew install direnv` on macOS)
- Basic knowledge of Go, JavaScript, and SQL
- A code editor (VS Code recommended)
- **EITHER**:
  - Docker Desktop (for full Supabase experience)
  - OR existing PostgreSQL 14+ (for simplified setup)

## Part 1: Setting Up Supabase Locally

### Setup Options

#### Option A: Full Supabase with Docker (Recommended)

Provides complete Supabase stack with real-time features:

```bash
# Install Supabase CLI via Homebrew
brew install supabase/tap/supabase

# Or via npm
npm install -g supabase
```

#### Option B: Native PostgreSQL Setup (Simplified)

If you want to avoid Docker or already have PostgreSQL:

```bash
# Run the native setup script instead
./setup-native.sh
```

**Note**: Native setup has limitations (no real-time features, no auth service)

### Step 2: Initialize Supabase Project (Docker only)

```bash
# Create project directory
mkdir crewmate-crisis
cd crewmate-crisis

# Initialize Supabase
supabase init

# Start local Supabase stack
supabase start
```

This will start all Supabase services locally:

- **Studio**: http://localhost:54323 (Database UI)
- **API**: http://localhost:54321
- **DB**: postgresql://postgres:postgres@localhost:54322/postgres
- **Inbucket** (email testing): http://localhost:54324

Save the output - you'll need the `anon key` and `service_role key`.

#### Handling Port Conflicts

If you already have PostgreSQL running locally, Supabase uses port 54322 (not 5432) so there shouldn't be conflicts. To change ports:

1. Edit `supabase/config.toml`:
```toml
[db]
port = 54323  # or any available port
```

2. Restart: `supabase stop && supabase start`

### Step 2.5: Configure Environment with direnv

Create `.envrc` file with your Supabase keys:

```bash
# Copy the keys from supabase start output
cp .envrc.example .envrc
# Edit .envrc with your actual keys
direnv allow
```

### Step 3: Database Schema

Create the database schema for our game:

```sql
-- Create players table
CREATE TABLE players (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    avatar_color TEXT DEFAULT 'blue',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Create game_rooms table
CREATE TABLE game_rooms (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    room_code TEXT UNIQUE NOT NULL,
    host_id UUID REFERENCES players(id),
    status TEXT DEFAULT 'waiting', -- waiting, playing, finished
    impostor_id UUID REFERENCES players(id),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Create room_players table (many-to-many)
CREATE TABLE room_players (
    room_id UUID REFERENCES game_rooms(id) ON DELETE CASCADE,
    player_id UUID REFERENCES players(id) ON DELETE CASCADE,
    is_alive BOOLEAN DEFAULT true,
    tasks_completed INTEGER DEFAULT 0,
    PRIMARY KEY (room_id, player_id)
);

-- Create messages table for chat
CREATE TABLE messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    room_id UUID REFERENCES game_rooms(id) ON DELETE CASCADE,
    player_id UUID REFERENCES players(id),
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Create votes table
CREATE TABLE votes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    room_id UUID REFERENCES game_rooms(id) ON DELETE CASCADE,
    voter_id UUID REFERENCES players(id),
    suspect_id UUID REFERENCES players(id),
    round INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE room_players ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (development only)
CREATE POLICY "Public players" ON players FOR ALL USING (true);
CREATE POLICY "Public game_rooms" ON game_rooms FOR ALL USING (true);
CREATE POLICY "Public room_players" ON room_players FOR ALL USING (true);
CREATE POLICY "Public messages" ON messages FOR ALL USING (true);
CREATE POLICY "Public votes" ON votes FOR ALL USING (true);

-- Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE players;
ALTER PUBLICATION supabase_realtime ADD TABLE game_rooms;
ALTER PUBLICATION supabase_realtime ADD TABLE room_players;
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
ALTER PUBLICATION supabase_realtime ADD TABLE votes;
```

Save this as `supabase/migrations/001_initial_schema.sql` and run:

```bash
supabase db reset
```

## Part 2: Go Backend Server

### Step 1: Initialize Go Module

```bash
go mod init crewmate-crisis
go get github.com/supabase-community/supabase-go
go get github.com/gorilla/mux
go get github.com/gorilla/handlers
```

### Step 2: Project Structure

```
crewmate-crisis/
├── main.go                 # Main server file
├── game/
│   ├── game.go            # Game logic
│   ├── player.go          # Player management
│   └── room.go            # Room management
├── handlers/
│   └── api.go             # API endpoints
├── static/                # Frontend files
│   ├── index.html
│   ├── style.css
│   └── app.js
├── .envrc                 # Environment variables (direnv)
└── supabase/
    └── migrations/
        └── 001_initial_schema.sql
```

### Step 3: Backend Implementation

See the complete code files below for the full implementation.

## Part 3: Frontend with Real-time Updates

The frontend uses vanilla JavaScript with Supabase's JavaScript client for real-time features and Tailwind CSS for styling.

### Key Features:
- Real-time player joining/leaving
- Live chat during discussion phase
- Synchronized voting system
- Task completion tracking
- Impostor elimination mechanics

## Part 4: Running the Game

### For Local Testing (Single Computer):

1. **Configure Environment**:
```bash
direnv allow  # Load environment variables
```

2. **Terminal 1 - Supabase**:
```bash
supabase start
```

3. **Terminal 2 - Go Server**:
```bash
go run main.go
```

4. **Open Browser**:
- Go to http://localhost:8080
- Open multiple browser windows to simulate different players

### For Classroom Use (Multiple Devices with ngrok) - RECOMMENDED:

1. **Start Services** (same as above):
```bash
supabase start
go run main.go
```

2. **Install & Run ngrok**:
```bash
# Install (first time only)
brew install ngrok

# Run the setup script
./start-ngrok.sh
```

3. **Configure for Network Access**:
- Get the ngrok URLs from the terminal windows
- Update `static/app.js` line 12 with your Supabase ngrok URL
- Share the game ngrok URL with students

4. **Students Connect**:
- Students just open the game URL in their browser
- Works on Chromebooks, tablets, phones - any device!

See `NGROK_QUICKSTART.md` for detailed instructions.

### How to Play:

1. **Create/Join Room**: First player creates a room and shares the code
2. **Wait for Players**: Need at least 3 players to start
3. **Game Start**: Host starts the game, one player becomes impostor
4. **Tasks Phase**: Crewmates complete tasks, impostor sabotages
5. **Emergency Meeting**: Called when body found or button pressed
6. **Discussion**: Players chat and discuss suspicions
7. **Voting**: Vote for who you think is the impostor
8. **Elimination**: Player with most votes is eliminated
9. **Win Conditions**:
   - Crewmates win: Vote out impostor OR complete all tasks
   - Impostor wins: Eliminate enough crewmates

## Part 5: Key Learning Points

### Supabase Real-time:
- Database changes automatically broadcast to all subscribed clients
- No manual WebSocket management needed
- Built-in presence tracking for online players

### Go + Supabase Integration:
- Go handles game logic and API endpoints
- Supabase manages data persistence and real-time sync
- Frontend connects directly to Supabase for live updates

### Modern Web Development:
- Server-Sent Events for one-way server updates
- WebSocket (via Supabase) for bidirectional communication
- Tailwind CSS for rapid UI development

## Part 6: Extending the Game

Ideas for students to implement:

1. **Power-ups**: Special abilities for players
2. **Mini-games**: Actual task implementations
3. **Voice Chat**: Integrate WebRTC for audio
4. **Custom Avatars**: Upload and store images
5. **Leaderboard**: Track wins/losses
6. **Spectator Mode**: Watch ongoing games
7. **Mobile Support**: Responsive design and touch controls
8. **AI Players**: Add bots for single-player mode

## Troubleshooting

### Common Issues:

1. **Docker not running**: Make sure Docker Desktop is started
2. **Port conflicts**: Check if ports 8080, 54321, 54323 are free
3. **Database connection**: Verify Supabase is running with `supabase status`
4. **CORS errors**: Ensure Go server has proper CORS headers

### Debugging Tips:

- Check Supabase Studio at http://localhost:54323 for database state
- Monitor browser console for WebSocket connections
- Use browser DevTools Network tab to inspect API calls
- Check Go server logs for errors

## Conclusion

This tutorial demonstrates how Supabase simplifies building real-time multiplayer applications. The combination of:
- PostgreSQL for data persistence
- Real-time subscriptions for live updates
- Built-in authentication
- Local development environment

Makes it an excellent choice for modern web applications that require collaborative features.

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Realtime Guide](https://supabase.com/docs/guides/realtime)
- [Go + Supabase Examples](https://github.com/supabase-community/supabase-go)
- [Tailwind CSS](https://tailwindcss.com)