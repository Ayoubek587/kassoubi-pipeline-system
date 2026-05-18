import { createClient } from "@supabase/supabase-js";

export type SupabaseAuthConfig = {
  supabaseUrl: string;
  supabaseAnonKey: string;
};

export function createBrowserSupabaseClient(config: SupabaseAuthConfig) {
  return createClient(config.supabaseUrl, config.supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  });
}
