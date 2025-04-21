import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Athlete } from 'src/app/core/models/Athlete.model';

export const athletesActions = createActionGroup({
  source: 'Athletes',
  events: {
    'Fetch Athletes': emptyProps(),
    'Fetch Athletes Success': props<{ athletes: Athlete[] }>(),
    'Fetch Athletes Failure': props<{ message?: string }>(),
  },
});
