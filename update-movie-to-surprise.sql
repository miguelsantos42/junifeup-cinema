-- Update movie to "Filme Surpresa"
-- Run this in your Supabase SQL Editor

UPDATE movies 
SET 
  title = 'Filme Surpresa',
  synopsis = 'Uma experiência cinematográfica única aguarda-te! Junta-te a nós para descobrir um filme cuidadosamente selecionado que será revelado apenas no momento da projeção!',
  updated_at = NOW()
WHERE id IN (SELECT id FROM movies LIMIT 1);
