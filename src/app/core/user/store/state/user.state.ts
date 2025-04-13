import { Session } from '@supabase/supabase-js';
import { AsyncData } from 'src/app/core/models/AsyncData.model';

export interface UserState {
  session: AsyncData<Session | undefined>;
}
