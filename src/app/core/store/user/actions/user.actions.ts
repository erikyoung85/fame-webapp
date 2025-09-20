import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Session } from '@supabase/supabase-js';
import {
  AthletePagePreview,
  RafflePreview,
  TeamPagePreview,
} from 'src/app/core/models/PagePreview.model';
import { Raffle } from 'src/app/core/models/Raffle.model';
import { UserProfile } from 'src/app/core/models/UserProfile.model';
import { PatchUserProfileRequestDtoV1 } from 'src/app/core/services/user-profile/dtos/requests/patch-user-profile.request.dto.v1';
import { SignupWithPasswordRequestDtoV1 } from 'src/app/core/services/user/dtos/requests/signup-with-password.request.dto.v1';

export const userActions = createActionGroup({
  source: 'User',
  events: {
    'Set Session': props<{ session: Session }>(),

    'Load Session': emptyProps(),
    'Load Session Success': props<{ session: Session | undefined }>(),
    'Load Session Failure': props<{ message?: string }>(),

    'Login With Magic Link': props<{ tokenHash: string }>(),
    'Login With Password': props<{ email: string; password: string }>(),
    'Login Success': props<{ session: Session }>(),
    'Login Failure': props<{ message: string }>(),

    Logout: emptyProps(),
    'Logout Success': emptyProps(),
    'Logout Failure': props<{ message: string }>(),

    'Signup With Password': props<{
      request: SignupWithPasswordRequestDtoV1;
    }>(),
    'Signup Success': emptyProps(),
    'Signup Failure': props<{ message: string }>(),

    'Reset Password': props<{ email: string }>(),
    'Reset Password Success': emptyProps(),
    'Reset Password Failure': props<{ message: string }>(),

    'Get User Profile': emptyProps(),
    'Get User Profile Success': props<{ userProfile: UserProfile }>(),
    'Get User Profile Failure': props<{ message: string }>(),

    'Clear User Profile': emptyProps(),
    'Update User Profile': props<{
      userProfile: UserProfile;
    }>(),
    'Update User Profile Success': props<{
      userProfile: UserProfile;
    }>(),
    'Update User Profile Failure': props<{ message: string }>(),

    'Patch User Profile': props<{ request: PatchUserProfileRequestDtoV1 }>(),
    'Patch User Profile Success': props<{ userProfile: UserProfile }>(),
    'Patch User Profile Failure': props<{ message: string }>(),

    'Fetch User Entered Raffles': emptyProps(),
    'Fetch User Entered Raffles Success': props<{ raffles: Raffle[] }>(),
    'Fetch User Entered Raffles Failure': props<{ message: string }>(),

    'Fetch User Managed Pages': emptyProps(),
    'Fetch User Managed Pages Success': props<{
      athletes: AthletePagePreview[];
      teams: TeamPagePreview[];
      raffles: RafflePreview[];
    }>(),
    'Fetch User Managed Pages Failure': props<{ message: string }>(),
  },
});
