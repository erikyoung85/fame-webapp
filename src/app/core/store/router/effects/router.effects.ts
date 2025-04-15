import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { map, withLatestFrom } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as routerSelectors from '../selectors/router.selectors';
import { Store } from '@ngrx/store';
import { RouterActions } from '../actions/router.actions';

@Injectable()
export class RouterEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private store: Store
  ) {}

  routerNavigateAction$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(RouterActions.navigateCommand),
        map(async ({ path, extras }) => {
          await this.router.navigate([path], extras);
        })
      );
    },
    { dispatch: false }
  );

  routerNavigateRelativeAction$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(RouterActions.navigateRelativeCommand),
        withLatestFrom(
          this.store.select(routerSelectors.selectUrlWithoutQueryParams)
        ),
        map(async ([{ path, extras }, url]) => {
          if (url !== undefined) {
            const relativePathNodes: string[] = path.split('/');
            const currentUrlNodes: string[] = url.split('/');

            relativePathNodes.forEach((node) => {
              if (node === '..') {
                currentUrlNodes.pop();
              } else {
                currentUrlNodes.push(node);
              }
            });

            const newPath: string = currentUrlNodes.join('/');
            await this.router.navigate([newPath], extras);
          }
        })
      );
    },
    { dispatch: false }
  );

  updateQueryParamsAction$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(RouterActions.updateQueryParamsCommand),
        map(async ({ queryParams }) => {
          await this.router.navigate([], { queryParams });
        })
      );
    },
    { dispatch: false }
  );

  navigateBackAction$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RouterActions.navigateBackCommand),
        concatLatestFrom(() =>
          this.store.select(routerSelectors.selectPreviousUrl)
        ),
        map(([_, previousUrl]) => this.router.navigate([previousUrl]))
      ),
    { dispatch: false }
  );
}
