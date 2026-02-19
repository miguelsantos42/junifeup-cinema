-- Update Zone 2 seats: Change from 4 rows of 6 to 6 rows of 4
-- Run this in your Supabase SQL Editor

-- Delete existing Zone 2 seats
DELETE FROM reservations WHERE seat_id IN (SELECT id FROM seats WHERE zone = 2);
DELETE FROM seats WHERE zone = 2;

-- Insert new Zone 2 seats: 6 rows of 4 chairs
INSERT INTO seats (type, zone, row, position)
SELECT 'chair', 2, row, pos::TEXT
FROM generate_series(1, 6) AS row,
     generate_series(1, 4) AS pos;
