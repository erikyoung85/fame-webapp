import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { AsyncData } from 'src/app/core/models/AsyncData.model';
import { Team } from 'src/app/core/models/Team.model';
import { TeamDetail } from 'src/app/core/models/TeamDetail.model';

export interface TeamsState extends EntityState<Team> {
  teamDetails: AsyncData<TeamDetail | undefined>;
  isLoading: boolean;
  error: string | undefined;
}

export const teamsEntityAdapter = createEntityAdapter<Team>({
  selectId: (team) => team.id,
  sortComparer: false,
});
