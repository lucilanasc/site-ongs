/*
# Expand pets table with adoption details + add adoption_forms and happy_endings tables

## Overview
This migration adds detailed fields to the `pets` table for the Pata Vida adoption ficha,
creates an `adoption_forms` table for the adoption questionnaire, and a `happy_endings` table
for success stories of adopted animals.

## 1. Modified Tables

### pets — new columns
- `sex` (text) — "Macho" or "Fêmea"
- `castrated` (boolean, default false) — whether the pet is castrated
- `vaccinated` (boolean, default false) — whether vaccinations are up to date
- `microchipped` (boolean, default false) — whether microchipped
- `fiv_felv` (text) — FIV/FeLV test status (for cats) or "N/A" for dogs
- `temperament` (text) — personality description e.g. "Dócil, brincalhão"
- `location` (text) — where the pet can be found
- `story` (text) — rescue/backstory
- `is_featured` (boolean, default false) — marks the mascot/featured pet (Chofer)
- `is_adopted` (boolean, default false) — marks pets that have been adopted (happy endings)

## 2. New Tables

### adoption_forms
- `id` (uuid, primary key)
- `pet_id` (uuid, foreign key to pets) — which pet the form is for
- `pet_name` (text) — pet name (denormalized for convenience)
- `adopter_name` (text, not null) — applicant's name
- `adopter_email` (text, not null) — applicant's email
- `adopter_phone` (text, not null) — applicant's phone
- `adopter_age` (text) — applicant's age range
- `housing_type` (text) — "Casa" or "Apartamento"
- `has_other_pets` (boolean) — has other pets at home
- `other_pets_detail` (text) — description of other pets
- `has_children` (boolean) — has children at home
- `has_time` (text) — "Sim" / "Parcial" / "Não" — has time for the pet
- `reason` (text) — reason for adopting
- `created_at` (timestamptz, default now())

### happy_endings
- `id` (uuid, primary key)
- `pet_name` (text, not null) — name of the adopted pet
- `image_url` (text, not null) — photo of the happy pet
- `story` (text, not null) — the adoption success story
- `adopter_message` (text) — quote from the adopter
- `created_at` (timestamptz, default now())

## 3. Security
- RLS enabled on all new tables.
- `adoption_forms`: public insert (anyone can apply), no public read (privacy).
- `happy_endings`: public read (stories are shared publicly), no public write.

## 4. Important Notes
1. No-auth public website — policies use `TO anon, authenticated`.
2. All new columns on `pets` are nullable so existing rows are not broken.
3. The `is_featured` flag is used to display Chofer as the mascot on the home page.
4. The `is_adopted` flag separates available pets from happy endings stories.
*/

-- Add new columns to pets table
ALTER TABLE pets ADD COLUMN IF NOT EXISTS sex text;
ALTER TABLE pets ADD COLUMN IF NOT EXISTS castrated boolean NOT NULL DEFAULT false;
ALTER TABLE pets ADD COLUMN IF NOT EXISTS vaccinated boolean NOT NULL DEFAULT false;
ALTER TABLE pets ADD COLUMN IF NOT EXISTS microchipped boolean NOT NULL DEFAULT false;
ALTER TABLE pets ADD COLUMN IF NOT EXISTS fiv_felv text;
ALTER TABLE pets ADD COLUMN IF NOT EXISTS temperament text;
ALTER TABLE pets ADD COLUMN IF NOT EXISTS location text;
ALTER TABLE pets ADD COLUMN IF NOT EXISTS story text;
ALTER TABLE pets ADD COLUMN IF NOT EXISTS is_featured boolean NOT NULL DEFAULT false;
ALTER TABLE pets ADD COLUMN IF NOT EXISTS is_adopted boolean NOT NULL DEFAULT false;

-- Adoption forms table
CREATE TABLE IF NOT EXISTS adoption_forms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id uuid REFERENCES pets(id) ON DELETE SET NULL,
  pet_name text,
  adopter_name text NOT NULL,
  adopter_email text NOT NULL,
  adopter_phone text NOT NULL,
  adopter_age text,
  housing_type text,
  has_other_pets boolean,
  other_pets_detail text,
  has_children boolean,
  has_time text,
  reason text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE adoption_forms ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_adoption_forms" ON adoption_forms;
CREATE POLICY "public_insert_adoption_forms" ON adoption_forms FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- Happy endings table
CREATE TABLE IF NOT EXISTS happy_endings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_name text NOT NULL,
  image_url text NOT NULL,
  story text NOT NULL,
  adopter_message text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE happy_endings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_happy_endings" ON happy_endings;
CREATE POLICY "public_read_happy_endings" ON happy_endings FOR SELECT
  TO anon, authenticated USING (true);
