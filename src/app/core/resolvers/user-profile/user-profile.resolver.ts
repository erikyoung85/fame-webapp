import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs';
import { AsyncDataStatus } from '../../models/AsyncData.model';
import { UserProfile } from '../../models/UserProfile.model';
import { userFeature } from '../../store/user/feature/user.feature';

export const userProfileResolver: ResolveFn<UserProfile | undefined> = (
  route,
  state
) => {
  const store = inject(Store);

  return store.select(userFeature.selectUserProfile).pipe(
    filter((async) => async.status === AsyncDataStatus.Success),
    map((user) => {
      return user.data;
    })
  );
};
