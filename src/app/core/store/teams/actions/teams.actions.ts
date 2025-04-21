import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Team } from 'src/app/core/models/Team.model';

export const teamsActions = createActionGroup({
  source: 'Teams',
  events: {
    'Fetch Teams': emptyProps(),
    'Fetch Teams Success': props<{ teams: Team[] }>(),
    'Fetch Teams Failure': props<{ message?: string }>(),
  },
});
