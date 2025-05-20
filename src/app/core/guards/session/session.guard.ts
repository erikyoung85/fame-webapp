import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, tap } from 'rxjs';
import { AsyncDataStatus } from '../../models/AsyncData.model';
import { userActions } from '../../store/user/actions/user.actions';
import { userFeature } from '../../store/user/feature/user.feature';

export const SessionGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);

  const MAX_RETRIES = 2;
  let retryCount = 0;

  return store.select(userFeature.selectSession).pipe(
    tap((sessionAsync) => {
      if (
        [AsyncDataStatus.Idle, AsyncDataStatus.Error].includes(
          sessionAsync.status
        ) &&
        retryCount < MAX_RETRIES
      ) {
        retryCount++;
        store.dispatch(userActions.loadSession());
      }
    }),
    filter(
      (sessionAsync) =>
        sessionAsync.status === AsyncDataStatus.Success ||
        (retryCount >= MAX_RETRIES &&
          sessionAsync.status === AsyncDataStatus.Error)
    ),
    map(() => true)
  );

  // const store = inject(Store);
  // const router = inject(Router);

  // return store.select(userFeature.selectSession).pipe(
  //   filter((async) => async.status === AsyncDataStatus.Success),
  //   map((sessionAsync) => {
  //     // Allow access if the user is not logged in
  //     if (sessionAsync.data === undefined) return true;

  //     return new RedirectCommand(
  //       router.parseUrl(
  //         `/${AppRoutes.Tabs}/${TabRoutes.Account}/${PageRoutes.UserProfile}`
  //       )
  //     );
  //   })
  // );
};
