import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs';
import { AsyncDataStatus } from 'src/app/core/async-data';
import { TeamDetail } from '../../models/TeamDetail.model';
import { teamsFeature } from '../../store/teams/feature/teams.feature';

export const favoriteTeamResolver: ResolveFn<TeamDetail | undefined> = (
  route,
  state
) => {
  const store = inject(Store);

  return store.select(teamsFeature.selectFavoriteTeam).pipe(
    filter((async) => async.status === AsyncDataStatus.Success),
    map((async) => {
      return async.data;
    })
  );
};
