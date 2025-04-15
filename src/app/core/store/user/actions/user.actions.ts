import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Session } from '@supabase/supabase-js';
import { UserProfile } from 'src/app/core/models/UserProfile.model';
import { SignupWithPasswordRequestDtoV1 } from 'src/app/core/services/dtos/requests/signup-with-password.request.dto.v1';

export const userActions = createActionGroup({
  source: 'User',
  events: {
    'Load Session': emptyProps(),
    'Load Session Success': props<{
      session: Session;
      userProfile: UserProfile | undefined;
    }>(),
    'Load Session Failure': props<{ message?: string }>(),

    'Login With Password': props<{ email: string; password: string }>(),
    'Login Success': props<{ session: Session; userProfile: UserProfile }>(),
    'Login Failure': props<{ message: string }>(),

    'Signup With Password': props<{
      request: SignupWithPasswordRequestDtoV1;
    }>(),
    'Signup Success': props<{ session: Session; userProfile: UserProfile }>(),
    'Signup Failure': props<{ message: string }>(),

    'Reset Password': props<{ email: string }>(),
    'Reset Password Success': emptyProps(),
    'Reset Password Failure': props<{ message: string }>(),

    'Update User Profile': props<{
      userProfile: UserProfile;
    }>(),
    'Update User Profile Success': props<{
      userProfile: UserProfile;
    }>(),
    'Update User Profile Failure': props<{ message: string }>(),
  },
});
