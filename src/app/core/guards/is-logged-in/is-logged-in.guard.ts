import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs';
import { AppRoutes, PageRoutes, TabRoutes } from 'src/app/app.routes';
import { AsyncDataStatus } from 'src/app/core/async-data';
import { userFeature } from '../../store/user/feature/user.feature';

export const isLoggedInGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(userFeature.selectSession).pipe(
    filter((async) => async.status === AsyncDataStatus.Success),
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
