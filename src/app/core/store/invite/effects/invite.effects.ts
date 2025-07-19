import { inject, Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular/standalone';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { isNotNil } from 'ramda';
import {
  catchError,
  distinctUntilChanged,
  filter,
  map,
  mergeMap,
  of,
  tap,
} from 'rxjs';
import { AcceptInviteRequestDtoV1 } from 'src/app/core/services/invite/dtos/requests/accept-invite.request.dto.v1';
import { InviteService } from 'src/app/core/services/invite/invite.service';
import { ModalService } from 'src/app/core/services/modal-service/modal.service';
import { userActions } from '../../user/actions/user.actions';
import { userFeature } from '../../user/feature/user.feature';
import { inviteActions } from '../actions/invite.actions';

@Injectable()
export class InviteEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly inviteService = inject(InviteService);
  private readonly toastController = inject(ToastController);
  private readonly modalService = inject(ModalService);

  triggerProcessInvite$ = createEffect(() =>
    this.store.select(userFeature.selectUserProfile).pipe(
      map((userProfile) => userProfile.data?.id),
      distinctUntilChanged(),
      filter(isNotNil),
      map(() => inviteActions.checkProcessInvite())
    )
  );

  checkProcessInvite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(inviteActions.checkProcessInvite),
      map(() => {
        const invite = this.inviteService.loadInviteInfo();
        if (invite === undefined) {
          return inviteActions.noInviteFound();
        }

        return inviteActions.acceptInvite({ invite });
      })
    )
  );

  acceptInvite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(inviteActions.acceptInvite),
      mergeMap((action) => {
        const request: AcceptInviteRequestDtoV1 = {
          email: action.invite.email,
          token: action.invite.token,
        };
        return this.inviteService.acceptInvite(request).pipe(
          map((response) => {
            if (response.error !== undefined) {
              return inviteActions.acceptInviteFailure({
                message: response.error,
              });
            }

            return inviteActions.acceptInviteSuccess({
              acceptedInvite: response.data,
            });
          }),
          catchError(() => {
            return of(
              inviteActions.acceptInviteFailure({
                message: 'Error occurred while accepting invitation.',
              })
            );
          })
        );
      })
    )
  );

  acceptInviteSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(inviteActions.acceptInviteSuccess),
      mergeMap(async (action) => {
        this.inviteService.clearInviteInfo();
        await this.modalService.openAcceptedInvite(action.acceptedInvite);
        return userActions.fetchUserManagedPages();
      })
    )
  );

  acceptInviteFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(inviteActions.acceptInviteFailure),
        tap(async (action) => {
          this.inviteService.clearInviteInfo();
          await this.toastController
            .create({
              message: action.message,
              color: 'danger',
              swipeGesture: 'vertical',
              duration: 2000,
            })
            .then((toast) => toast.present());
        })
      ),
    { dispatch: false }
  );
}
