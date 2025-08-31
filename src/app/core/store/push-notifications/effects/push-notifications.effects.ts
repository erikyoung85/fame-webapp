import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { isNotNil } from 'ramda';
import {
  catchError,
  distinctUntilChanged,
  filter,
  map,
  of,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import { isAsyncLoaded } from 'src/app/core/async-data';
import { FCMService } from 'src/app/core/services/fcm/fcm.service';
import { userFeature } from '../../user/feature/user.feature';
import { pushNotificationsActions } from '../actions/push-notifications.actions';
import { pushNotificationsFeature } from '../feature/push-notifications.feature';

@Injectable()
export class PushNotificationsEffects {
  private readonly actions$ = inject(Actions);
  private readonly fcmService = inject(FCMService);
  private readonly store = inject(Store);

  userIdListener$ = createEffect(() =>
    this.store.select(userFeature.selectSession).pipe(
      filter(isAsyncLoaded),
      map((session) => session.data?.user.id),
      distinctUntilChanged(),
      withLatestFrom(
        this.store
          .select(pushNotificationsFeature.selectToken)
          .pipe(filter(isNotNil))
      ),
      map(([userId, token]) => {
        return pushNotificationsActions.saveToken({
          token: token,
          userId: userId,
        });
      })
    )
  );

  saveToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(pushNotificationsActions.saveToken),
      withLatestFrom(this.store.select(userFeature.selectUserId)),
      switchMap(([action, userId]) => {
        return this.fcmService
          .saveTokenToSupabase({
            token: action.token,
            userId: action.userId ?? userId,
          })
          .pipe(
            map((response) => {
              if (response.error !== null) {
                return pushNotificationsActions.saveTokenFailure({
                  message: response.error.message,
                });
              }

              return pushNotificationsActions.saveTokenSuccess();
            }),
            catchError((error: Error) => {
              return of(
                pushNotificationsActions.saveTokenFailure({
                  message: error.message,
                })
              );
            })
          );
      })
    )
  );
}
