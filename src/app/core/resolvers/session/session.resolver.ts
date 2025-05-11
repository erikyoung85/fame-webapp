import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { Session } from '@supabase/supabase-js';
import { filter, map, tap } from 'rxjs';
import { AsyncDataStatus } from '../../models/AsyncData.model';
import { userActions } from '../../store/user/actions/user.actions';
import { userFeature } from '../../store/user/feature/user.feature';

export const sessionResolver: ResolveFn<Session | undefined> = (
  route,
  state
) => {
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
    map((sessionAsync) => sessionAsync?.data)
  );
};
