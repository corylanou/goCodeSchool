-- Create players table
CREATE TABLE players (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    username TEXT NOT NULL,
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