import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, tap } from 'rxjs';
import { AsyncDataStatus } from '../../models/AsyncData.model';
import {
  AthletePagePreview,
  RafflePreview,
  TeamPagePreview,
} from '../../models/PagePreview.model';
import { userActions } from '../../store/user/actions/user.actions';
import { userFeature } from '../../store/user/feature/user.feature';

export const userManagedPagesResolver: ResolveFn<
  | {
      athletes: AthletePagePreview[];
      teams: TeamPagePreview[];
      raffles: RafflePreview[];
    }
  | undefined
> = (route, state) => {
  const store = inject(Store);

  return store.select(userFeature.selectManagedPages).pipe(
    tap((managedPagesAsync) => {
      if (managedPagesAsync.status === AsyncDataStatus.Idle) {
        store.dispatch(userActions.fetchUserManagedPages());
      }
    }),
    filter(
      (managedPagesAsync) =>
        managedPagesAsync.status === AsyncDataStatus.Success
    ),
    map((managedPagesAsync) => {
      return managedPagesAsync.data;
    })
  );
};
