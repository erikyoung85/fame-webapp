import { Session } from '@supabase/supabase-js';
import { AsyncData } from 'src/app/core/models/AsyncData.model';
import {
  AthletePagePreview,
  RafflePreview,
  TeamPagePreview,
} from 'src/app/core/models/PagePreview.model';
import { Raffle } from 'src/app/core/models/Raffle.model';
import { UserProfile } from 'src/app/core/models/UserProfile.model';

export interface UserState {
  session: AsyncData<Session | undefined>;
  userProfile: AsyncData<UserProfile | undefined>;
  enteredRaffles: AsyncData<Raffle[]>;
  managedPages: AsyncData<{
    athletes: AthletePagePreview[];
    teams: TeamPagePreview[];
    raffles: RafflePreview[];
  }>;
}
