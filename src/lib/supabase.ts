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
