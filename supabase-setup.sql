-- JuniFeup Cinema - Database Setup Script
-- Run this in your Supabase SQL Editor

-- Create movies table
CREATE TABLE IF NOT EXISTS movies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  poster_url TEXT,
  synopsis TEXT NOT NULL,
  session_date DATE NOT NULL,
  session_time TIME NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create seats table
CREATE TABLE IF NOT EXISTS seats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('table', 'chair')),
  zone INTEGER NOT NULL CHECK (zone IN (1, 2)),
  row INTEGER NOT NULL,
  position TEXT NOT NULL,
  table_number INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create reservations table
CREATE TABLE IF NOT EXISTS reservations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  seat_id UUID NOT NULL REFERENCES seats(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(seat_id)
);

-- Enable Row Level Security
ALTER TABLE movies ENABLE ROW LEVEL SECURITY;
ALTER TABLE seats ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for movies
DROP POLICY IF EXISTS "Anyone can read movies" ON movies;
CREATE POLICY "Anyone can read movies" ON movies
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Only admins can manage movies" ON movies;
CREATE POLICY "Only admins can manage movies" ON movies
  FOR ALL USING (auth.role() = 'authenticated');

-- RLS Policies for seats
DROP POLICY IF EXISTS "Anyone can read seats" ON seats;
CREATE POLICY "Anyone can read seats" ON seats
  FOR SELECT USING (true);

-- RLS Policies for reservations
DROP POLICY IF EXISTS "Anyone can read reservations" ON reservations;
CREATE POLICY "Anyone can read reservations" ON reservations
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Anyone can create reservations" ON reservations;
CREATE POLICY "Anyone can create reservations" ON reservations
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Only admins can delete reservations" ON reservations;
CREATE POLICY "Only admins can delete reservations" ON reservations
  FOR DELETE USING (auth.role() = 'authenticated');

-- Allow users to delete their own reservations by name
-- Note: This is a simple implementation. For production, consider using a more secure method
DROP POLICY IF EXISTS "Users can delete their own reservations" ON reservations;
CREATE POLICY "Users can delete their own reservations" ON reservations
  FOR DELETE USING (true);

-- Initialize seats
-- First, delete existing seats and reservations (if re-running script)
DELETE FROM reservations;
DELETE FROM seats;

-- Zone 1: Tables (4 tables, 2 seats each)
INSERT INTO seats (type, zone, row, position, table_number) VALUES
  ('table', 1, 1, 'A', 1), ('table', 1, 1, 'B', 1),
  ('table', 1, 1, 'A', 2), ('table', 1, 1, 'B', 2),
  ('table', 1, 1, 'A', 3), ('table', 1, 1, 'B', 3),
  ('table', 1, 1, 'A', 4), ('table', 1, 1, 'B', 4);

-- Zone 1: Central chairs - 3 rows of 4, then 3 rows of 6
-- First 3 rows: 4 chairs each
INSERT INTO seats (type, zone, row, position)
SELECT 'chair', 1, row, pos::TEXT
FROM generate_series(1, 3) AS row,
     generate_series(1, 4) AS pos;

-- Next 3 rows: 6 chairs each
INSERT INTO seats (type, zone, row, position)
SELECT 'chair', 1, row, pos::TEXT
FROM generate_series(4, 6) AS row,
     generate_series(1, 6) AS pos;

-- Zone 2: 6 rows of 4 chairs
INSERT INTO seats (type, zone, row, position)
SELECT 'chair', 2, row, pos::TEXT
FROM generate_series(1, 6) AS row,
     generate_series(1, 4) AS pos;

-- Create a sample movie (optional)
-- Delete existing movies first (if re-running script)
DELETE FROM movies;

INSERT INTO movies (title, poster_url, synopsis, session_date, session_time) VALUES
  (
    'Filme Surpresa',
    'https://example.com/poster.jpg',
    'Uma experiência cinematográfica única aguarda-te! Junta-te a nós para descobrir um filme cuidadosamente selecionado que será revelado apenas no momento da projeção. Uma noite de surpresas e entretenimento no coração da FEUP.',
    '2026-03-01',
    '21:00:00'
  );
