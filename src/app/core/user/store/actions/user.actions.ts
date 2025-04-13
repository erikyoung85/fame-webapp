import { createActionGroup, props } from '@ngrx/store';
import { Session } from '@supabase/supabase-js';

export const userActions = createActionGroup({
  source: 'User',
  events: {
    'Login With Password': props<{ email: string; password: string }>(),
    'Login Success': props<{ session: Session }>(),
    'Login Failure': props<{ message: string }>(),
  },
});
