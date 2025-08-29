import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { createClient, Session, SupabaseClient } from '@supabase/supabase-js';
import { Database } from 'database.types';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient<Database>;

  private readonly _tokenRefreshed$$ = new Subject<Session>();
  readonly tokenRefreshed$ = this._tokenRefreshed$$.asObservable();

  constructor() {
    const supabaseUrl = environment.supabase.url;
    const supabaseAnonKey = environment.supabase.anonKey;

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error(
        'Supabase URL and Anon Key must be provided in environment variables.'
      );
    }

    try {
      this.supabase = createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          autoRefreshToken: true,
          persistSession: true, // we’ll handle persistence ourselves
          detectSessionInUrl: false,
          storage: {
            getItem: async (key) => {
              const { value } = await Preferences.get({ key });
              return value;
            },
            setItem: async (key, value) => {
              await Preferences.set({ key, value });
            },
            removeItem: async (key) => {
              await Preferences.remove({ key });
            },
          },
        },
      });
      this.listenToAuthChanges();
    } catch {
      throw new Error(
        'Failed to create Supabase client. Please check your Supabase URL and Anon Key.'
      );
    }
  }

  get client() {
    return this.supabase;
  }

  private listenToAuthChanges() {
    // Notify when token is refreshed
    this.supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'TOKEN_REFRESHED' && session !== null) {
        this._tokenRefreshed$$.next(session);
      }
    });
  }
}
