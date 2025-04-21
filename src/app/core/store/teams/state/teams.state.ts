import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Team } from 'src/app/core/models/Team.model';

export interface TeamsState extends EntityState<Team> {
  isLoading: boolean;
  error: string | undefined;
}

export const teamsEntityAdapter = createEntityAdapter<Team>({
  selectId: (team) => team.id,
  sortComparer: false,
});
