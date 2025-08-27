import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Athlete } from 'src/app/core/models/Athlete.model';
import { AthleteDetail } from 'src/app/core/models/AthleteDetail.model';
import { UpdateAthleteRequestDtoV1 } from 'src/app/core/services/athletes/dtos/requests/updateAthlete.request.dto.v1';

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

    'Update Athlete': props<{ request: UpdateAthleteRequestDtoV1 }>(),
    'Update Athlete Success': props<{ athleteDetails: AthleteDetail }>(),
    'Update Athlete Failure': props<{ athleteId: number; message?: string }>(),

    'Fetch Trending Athletes': emptyProps(),
    'Fetch Trending Athletes Success': props<{ athletes: Athlete[] }>(),
    'Fetch Trending Athletes Failure': props<{ message: string }>(),
  },
});
