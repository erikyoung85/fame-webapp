import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Team } from 'src/app/core/models/Team.model';
import { TeamDetail } from 'src/app/core/models/TeamDetail.model';

export const teamsActions = createActionGroup({
  source: 'Teams',
  events: {
    'Fetch Teams': emptyProps(),
    'Fetch Teams Success': props<{ teams: Team[] }>(),
    'Fetch Teams Failure': props<{ message?: string }>(),

    'Fetch Team Details': props<{ teamId: number }>(),
    'Fetch Team Details Success': props<{
      teamId: number;
      teamDetails: TeamDetail;
    }>(),
    'Fetch Team Details Failure': props<{ teamId: number; message?: string }>(),
  },
});
