import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string | null;
  age: string | null;
  description: string;
  image_url: string;
  status: string;
  sex: string | null;
  castrated: boolean;
  vaccinated: boolean;
  microchipped: boolean;
  fiv_felv: string | null;
  temperament: string | null;
  location: string | null;
  story: string | null;
  is_featured: boolean;
  is_adopted: boolean;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export interface Donation {
  id: string;
  donor_name: string | null;
  email: string | null;
  amount: number;
  status: string;
  created_at: string;
}

export interface AdoptionForm {
  id: string;
  pet_id: string | null;
  pet_name: string | null;
  adopter_name: string;
  adopter_email: string;
  adopter_phone: string;
  adopter_age: string | null;
  housing_type: string | null;
  has_other_pets: boolean | null;
  other_pets_detail: string | null;
  has_children: boolean | null;
  has_time: string | null;
  reason: string | null;
  created_at: string;
}

export interface HappyEnding {
  id: string;
  pet_name: string;
  image_url: string;
  story: string;
  adopter_message: string | null;
  created_at: string;
}
