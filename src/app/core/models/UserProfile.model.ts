import { AuthUser } from '@supabase/supabase-js';

export interface UserProfile {
  authUser?: AuthUser;

  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export class UserProfileFactory {
  static fromSupabaseUser(user: AuthUser): UserProfile {
    return {
      id: user.id,
      email: user.email || '',
      firstName: user.user_metadata?.['first_name'] || '',
      lastName: user.user_metadata?.['last_name'] || '',
    };
  }
}
