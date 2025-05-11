import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Athlete } from 'src/app/core/models/Athlete.model';
import { AthleteDetail } from 'src/app/core/models/AthleteDetail.model';

export const athletesActions = createActionGroup({
  source: 'Athletes',
  events: {
    'Fetch Athletes': emptyProps(),
    'Fetch Athletes Success': props<{ athletes: Athlete[] }>(),
    'Fetch Athletes Failure': props<{ message?: string }>(),

    'Fetch Athlete Details': props<{ athleteId: number }>(),
    'Fetch Athlete Details Success': props<{ athleteDetails: AthleteDetail }>(),
    'Fetch Athlete Details Failure': props<{
      athleteId: number;
      message?: string;
    }>(),
  },
});
