import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { isNotNil } from 'ramda';
import { catchError, filter, map, of, switchMap, withLatestFrom } from 'rxjs';
import { FCMService } from 'src/app/core/services/fcm/fcm.service';
import { userFeature } from '../../user/feature/user.feature';
import { pushNotificationsActions } from '../actions/push-notifications.actions';

@Injectable()
export class PushNotificationsEffects {
  private readonly actions$ = inject(Actions);
  private readonly fcmService = inject(FCMService);
  private readonly store = inject(Store);

  saveFCMToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(pushNotificationsActions.saveFCMToken),
      withLatestFrom(
        this.store.select(userFeature.selectUserId).pipe(filter(isNotNil))
      ),
      switchMap(([action, userId]) => {
        return this.fcmService.saveTokenToSupabase(userId, action.token).pipe(
          map((response) => {
            if (response.error !== null) {
              return pushNotificationsActions.saveFCMTokenFailure({
                message: response.error.message,
              });
            }

            return pushNotificationsActions.saveFCMTokenSuccess();
          }),
          catchError((error: Error) => {
            return of(
              pushNotificationsActions.saveFCMTokenFailure({
                message: error.message,
              })
            );
          })
        );
      })
    )
  );
}
