import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, tap } from 'rxjs';
import { AppRoutes, PageRoutes, TabRoutes } from 'src/app/app.routes';
import { isAsyncIdle, isAsyncLoaded } from 'src/app/core/async-data';
import { userActions } from '../../store/user/actions/user.actions';
import { userFeature } from '../../store/user/feature/user.feature';

export const isLoggedInGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(userFeature.selectSession).pipe(
    tap((async) => {
      if (isAsyncIdle(async)) {
        store.dispatch(userActions.loadSession());
      }
    }),
    filter(isAsyncLoaded),
    map((sessionAsync) => {
      // Allow access if the user is logged in
      if (sessionAsync.data !== undefined) return true;

      return new RedirectCommand(
        router.parseUrl(
          `/${AppRoutes.Tabs}/${TabRoutes.Account}/${PageRoutes.Login}`
        )
      );
    })
  );
};
