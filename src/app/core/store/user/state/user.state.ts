import { Session } from '@supabase/supabase-js';
import { AsyncData } from 'src/app/core/models/AsyncData.model';
import { UserProfile } from 'src/app/core/models/UserProfile.model';

export interface UserState {
  userProfile: AsyncData<UserProfile | undefined>;
  session: AsyncData<Session | undefined>;
  managedPages: AsyncData<{
    athletes: { id: number; name: string; avatarUrl: string | undefined }[];
  }>;
}
