import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Team } from 'src/app/core/models/Team.model';
import { TeamDetail } from 'src/app/core/models/TeamDetail.model';
import { UpdateTeamRequestDtoV1 } from 'src/app/core/services/teams/dtos/requests/update-team.request.dto.v1';

export const teamsActions = createActionGroup({
  source: 'Teams',
  events: {
    'Fetch Teams': emptyProps(),
    'Fetch Teams Success': props<{ teams: Team[] }>(),
    'Fetch Teams Failure': props<{ message?: string }>(),

    'Fetch Team Details': props<{ teamId: number }>(),
    'Fetch Team Details Success': props<{ teamDetails: TeamDetail }>(),
    'Fetch Team Details Failure': props<{ teamId: number; message?: string }>(),

    'Update Team': props<{ request: UpdateTeamRequestDtoV1 }>(),
    'Update Team Success': props<{ teamDetails: TeamDetail }>(),
    'Update Team Failure': props<{ teamId: number; message?: string }>(),

    'Fetch Trending Teams': emptyProps(),
    'Fetch Trending Teams Success': props<{ teams: Team[] }>(),
    'Fetch Trending Teams Failure': props<{ message: string }>(),
  },
});
