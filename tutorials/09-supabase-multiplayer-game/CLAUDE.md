# Claude Code Project Instructions - Crewmate Crisis Tutorial

## Project Overview
This is a multiplayer game tutorial demonstrating Supabase with Go backend and real-time features.

## Go Version
- **Uses Go 1.25+** - All code and documentation should reference Go 1.25 or higher

## Environment Configuration
- **Uses direnv**: This project uses `.envrc` files instead of `.env`
- **Required environment variables**:
  - `SUPABASE_URL` - Local Supabase URL (http://localhost:54321)
  - `SUPABASE_ANON_KEY` - From supabase start output
  - `SUPABASE_SERVICE_KEY` - From supabase start output
  - `PORT` - Server port (default: 8080)

## Key Project Conventions
- No `.env` files - use `.envrc` with direnv
- No godotenv package - environment loaded via direnv
- Frontend uses vanilla JavaScript with Supabase client
- Tailwind CSS via CDN for styling
- Real-time features via Supabase WebSockets

## Development Workflow
1. Always ensure direnv is loaded: `direnv allow`
2. Supabase must be running: `supabase start`
3. Go server handles game logic and API
4. Frontend connects directly to Supabase for real-time

## Important Files
- `.envrc.example` - Template for environment variables
- `main.go` - Go server without godotenv dependency
- `static/app.js` - Contains SUPABASE_ANON_KEY that needs updating
- `supabase/migrations/` - Database schema

## Testing
- Open multiple browser windows for multiplayer testing
- Minimum 3 players required to start game
- Use Supabase Studio (http://localhost:54323) to monitor database

## Common Issues
- If environment not loading: `direnv allow`
- If port conflict: Change PORT in `.envrc` and `direnv reload`
- WebSocket issues: Check SUPABASE_ANON_KEY in app.js