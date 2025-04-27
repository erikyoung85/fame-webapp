import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, withLatestFrom } from 'rxjs';
import { AsyncDataStatus } from '../../models/AsyncData.model';
import { TeamDetail } from '../../models/TeamDetail.model';
import { teamsFeature } from '../../store/teams/feature/teams.feature';
import { userFeature } from '../../store/user/feature/user.feature';

export const favoriteTeamResolver: ResolveFn<TeamDetail | undefined> = (
  route,
  state
) => {
  const store = inject(Store);

  return store.select(teamsFeature.selectFavoriteTeam).pipe(
    withLatestFrom(store.select(userFeature.selectIsLoggedIn)),
    filter(([favoriteTeam, isLoggedIn]) => {
      return (
        isLoggedIn === false ||
        favoriteTeam === undefined ||
        favoriteTeam.status === AsyncDataStatus.Success
      );
    }),
    map(([favoriteTeamAsync, _]) => favoriteTeamAsync?.data)
  );
};
