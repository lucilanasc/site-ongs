/*
# Create database tables for NGO animal rescue website

## Overview
This migration creates three tables for a single-tenant (no-auth) NGO website:
- `pets` — the pet gallery/mural shown on the landing page
- `contact_messages` — messages submitted through the contact form
- `donations` — records of donations made through the site

## 1. New Tables

### pets
- `id` (uuid, primary key)
- `name` (text, not null) — pet's name
- `species` (text, not null) — e.g. "Cachorro", "Gato"
- `breed` (text) — breed or mix
- `age` (text) — age description e.g. "2 anos"
- `description` (text, not null) — story/description
- `image_url` (text, not null) — photo URL
- `status` (text, default 'available') — 'available' or 'adopted'
- `created_at` (timestamptz, default now())

### contact_messages
- `id` (uuid, primary key)
- `name` (text, not null) — sender's name
- `email` (text, not null) — sender's email
- `message` (text, not null) — the message body
- `created_at` (timestamptz, default now())

### donations
- `id` (uuid, primary key)
- `donor_name` (text) — optional donor name
- `email` (text) — optional email
- `amount` (numeric, not null) — donation amount in BRL
- `status` (text, default 'pending') — 'pending', 'completed', 'failed'
- `created_at` (timestamptz, default now())

## 2. Security
- RLS enabled on all three tables.
- `pets`: public read (anon + authenticated), no public write (managed via dashboard).
- `contact_messages`: public insert (anyone can submit), no public read (privacy).
- `donations`: public insert (anyone can initiate), no public read (privacy).

## 3. Important Notes
1. This is a no-auth public website — all policies use `TO anon, authenticated`.
2. Pets are read-only from the frontend; they are managed via the Supabase dashboard.
3. Contact messages and donations can be inserted by anyone but not read from the frontend.
*/

-- Pets table
CREATE TABLE IF NOT EXISTS pets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  species text NOT NULL,
  breed text,
  age text,
  description text NOT NULL,
  image_url text NOT NULL,
  status text NOT NULL DEFAULT 'available',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE pets ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_pets" ON pets;
CREATE POLICY "public_read_pets" ON pets FOR SELECT
  TO anon, authenticated USING (true);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_contact_messages" ON contact_messages;
CREATE POLICY "public_insert_contact_messages" ON contact_messages FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- Donations table
CREATE TABLE IF NOT EXISTS donations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_name text,
  email text,
  amount numeric NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_donations" ON donations;
CREATE POLICY "public_insert_donations" ON donations FOR INSERT
  TO anon, authenticated WITH CHECK (true);
