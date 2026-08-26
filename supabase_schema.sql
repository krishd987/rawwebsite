-- supabase_schema.sql
-- Create the team table for PPT submissions
-- This script is intended to be run in Supabase (PostgreSQL) via the SQL editor.

CREATE TABLE IF NOT EXISTS public.team (
  id BIGSERIAL PRIMARY KEY,
  team_name TEXT NOT NULL,
  team_number INTEGER NOT NULL,
  leader_name TEXT NOT NULL,
  ppt_url TEXT,               -- URL to the PPT stored in Supabase Storage
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- If the table already existed with a BYTEA column, alter it to TEXT.
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='team' AND column_name='ppt_file') THEN
    ALTER TABLE public.team ALTER COLUMN ppt_file DROP CONSTRAINT IF EXISTS ppt_max_size;
    ALTER TABLE public.team RENAME COLUMN ppt_file TO ppt_url;
    ALTER TABLE public.team ALTER COLUMN ppt_url TYPE TEXT USING ppt_url::text;
  END IF;
END $$;

-- Add an index on team_number for quick look‑ups.
CREATE INDEX IF NOT EXISTS idx_team_number ON public.team(team_number);
