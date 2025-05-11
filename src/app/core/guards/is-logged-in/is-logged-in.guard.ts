import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs';
import { AppRoutes, PageRoutes, TabRoutes } from 'src/app/app.routes';
import { AsyncDataStatus } from '../../models/AsyncData.model';
import { userFeature } from '../../store/user/feature/user.feature';

export const isLoggedInGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(userFeature.selectSession).pipe(
    filter((async) => async.status === AsyncDataStatus.Success),
    map((sessionAsync) => {
      if (sessionAsync.data !== undefined) return true;

      return new RedirectCommand(
        router.parseUrl(
          `/${AppRoutes.Tabs}/${TabRoutes.Account}/${PageRoutes.Login}`
        )
      );
    })
  );
};
