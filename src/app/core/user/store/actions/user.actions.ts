import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Session } from '@supabase/supabase-js';

export const userActions = createActionGroup({
  source: 'User',
  events: {
    'Load Session': emptyProps(),
    'Load Session Success': props<{ session: Session }>(),
    'Load Session Failure': props<{ message?: string }>(),

    'Login With Password': props<{ email: string; password: string }>(),
    'Login Success': props<{ session: Session }>(),
    'Login Failure': props<{ message: string }>(),
  },
});
