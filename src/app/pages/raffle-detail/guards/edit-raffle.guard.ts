import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, switchMap, tap } from 'rxjs';
import { AsyncDataStatus } from 'src/app/core/models/AsyncData.model';
import { userActions } from 'src/app/core/store/user/actions/user.actions';
import { userFeature } from 'src/app/core/store/user/feature/user.feature';

export const editRaffleGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);

  const raffleId: number = Number(route.params['raffleId']);

  return store.select(userFeature.selectManagedPages).pipe(
    tap((async) => {
      if (async.status === AsyncDataStatus.Idle) {
        store.dispatch(userActions.fetchUserManagedPages());
      }
    }),
    filter((async) => async.status === AsyncDataStatus.Success),
    switchMap(() => store.select(userFeature.selectIsRaffleManager(raffleId)))
  );
};
