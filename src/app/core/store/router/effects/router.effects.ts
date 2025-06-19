import { inject, Injectable } from '@angular/core';
import { NavController } from '@ionic/angular/standalone';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, withLatestFrom } from 'rxjs';
import { AppRoutes } from 'src/app/app.routes';
import { RouterActions } from '../actions/router.actions';
import { selectCurrentTabRoute } from '../selectors/router.selectors';

@Injectable()
export class RouterEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly navController = inject(NavController);

  routeInCurrentTab$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RouterActions.routeInCurrentTab),
        withLatestFrom(this.store.select(selectCurrentTabRoute)),
        map(async ([action, currentTabRoute]) => {
          if (currentTabRoute === undefined) {
            console.error(
              'Not in a tab. Cannot navigate within non-existent tab.'
            );
            return;
          }

          let url = Array.isArray(action.url)
            ? action.url.join('/')
            : action.url;

          if (url.at(0) === '/') {
            url = url.slice(1);
          }

          url = `${AppRoutes.Tabs}/${currentTabRoute}/${url}`;
          const options = {
            animated: action.animated,
          };

          if (action.direction === 'back') {
            return this.navController.navigateBack([url], options);
          }

          return this.navController.navigateForward([url], options);
        })
      ),
    { dispatch: false }
  );
}
