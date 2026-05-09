import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let client: ReturnType<typeof createClient> | null = null;

if (supabaseUrl && supabaseKey) {
  client = createClient(supabaseUrl, supabaseKey);
}

export const supabase = client;
