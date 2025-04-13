import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    const supabaseUrl = environment.supabaseUrl;
    const supabaseAnonKey = environment.supabaseAnonKey;

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error(
        'Supabase URL and Anon Key must be provided in environment variables.'
      );
    }

    try {
      this.supabase = createClient(supabaseUrl, supabaseAnonKey);
    } catch {
      throw new Error(
        'Failed to create Supabase client. Please check your Supabase URL and Anon Key.'
      );
    }
  }

  get client() {
    return this.supabase;
  }
}
