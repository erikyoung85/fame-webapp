import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, withLatestFrom } from 'rxjs';
import { isAsyncLoaded } from 'src/app/core/async-data';
import { UserProfile } from '../../models/UserProfile.model';
import { userFeature } from '../../store/user/feature/user.feature';

export const userProfileResolver: ResolveFn<UserProfile | undefined> = (
  route,
  state
) => {
  const store = inject(Store);

  return store.select(userFeature.selectUserProfile).pipe(
    withLatestFrom(store.select(userFeature.selectSession)),
    filter(
      ([profileAsync, sessionAsync]) =>
        isAsyncLoaded(sessionAsync) && isAsyncLoaded(profileAsync)
    ),
    map(([userProfileAsync]) => {
      return userProfileAsync.data;
    })
  );
};
