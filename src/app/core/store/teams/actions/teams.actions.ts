import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Team } from 'src/app/core/models/Team.model';
import { TeamDetail } from 'src/app/core/models/TeamDetail.model';

export const teamsActions = createActionGroup({
  source: 'Teams',
  events: {
    'Fetch Teams': emptyProps(),
    'Fetch Teams Success': props<{ teams: Team[] }>(),
    'Fetch Teams Failure': props<{ message?: string }>(),

    'Clear Team Details': emptyProps(),
    'Fetch Team Details': props<{ teamId: number }>(),
    'Fetch Team Details Success': props<{ teamDetails: TeamDetail }>(),
    'Fetch Team Details Failure': props<{ message?: string }>(),
  },
});
