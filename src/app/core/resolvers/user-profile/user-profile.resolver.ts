import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, withLatestFrom } from 'rxjs';
import { AsyncDataStatus } from 'src/app/core/async-data';
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
        sessionAsync.status === AsyncDataStatus.Success &&
        profileAsync.status === AsyncDataStatus.Success
    ),
    map(([userProfileAsync]) => {
      return userProfileAsync.data;
    })
  );
};
