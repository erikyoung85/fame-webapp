import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { AppRoutes, PageRoutes, TabRoutes } from 'src/app/app.routes';
import { userFeature } from '../../store/user/feature/user.feature';

export const isLoggedInGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(userFeature.selectIsLoggedIn).pipe(
    map((isLoggedIn) => {
      if (isLoggedIn) return true;

      return new RedirectCommand(
        router.parseUrl(
          `/${AppRoutes.Tabs}/${TabRoutes.Account}/${PageRoutes.Login}`
        )
      );
    })
  );
};
