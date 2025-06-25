import { inject, Injectable } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular/standalone';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { RaffleFactory } from 'src/app/core/models/Raffle.model';
import { ModalDismissRole } from 'src/app/core/services/modal-service/modal.service';
import { RaffleService } from 'src/app/core/services/raffle/raffle.service';
import { rafflesActions } from '../actions/raffles.actions';

@Injectable()
export class RafflesEffects {
  private readonly actions$ = inject(Actions);
  private readonly toastController = inject(ToastController);
  private readonly raffleService = inject(RaffleService);
  private readonly modalController = inject(ModalController);

  failureMessages$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          rafflesActions.fetchRafflesFailure,
          rafflesActions.createRaffleFailure
        ),
        tap(async (action) => {
          if (action.message !== undefined) {
            await this.toastController
              .create({
                message: action.message,
                duration: 2000,
                color: 'danger',
              })
              .then((toast) => toast.present());
          }
        })
      ),
    { dispatch: false }
  );

  fetchRaffles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(rafflesActions.fetchRaffles),
      switchMap(() => {
        return this.raffleService.getRafflesForAthlete(1).pipe(
          map((response) => {
            if (response.error !== null) {
              return rafflesActions.fetchRafflesFailure({
                message: response.error.message,
              });
            }

            return rafflesActions.fetchRafflesSuccess({
              raffles: response.data.map(RaffleFactory.fromDtoV1),
            });
          }),
          catchError((error: Error) => {
            return of(
              rafflesActions.fetchRafflesFailure({
                message: error.message,
              })
            );
          })
        );
      })
    )
  );

  createRaffle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(rafflesActions.createRaffle),
      switchMap((action) => {
        return this.raffleService.createRaffle(action.request).pipe(
          map((response) => {
            if (response.error !== null) {
              return rafflesActions.createRaffleFailure({
                message: response.error.message,
              });
            }

            return rafflesActions.createRaffleSuccess({
              raffle: RaffleFactory.fromDtoV1(response.data),
            });
          }),
          catchError((error: Error) => {
            return of(
              rafflesActions.createRaffleFailure({
                message: error.message,
              })
            );
          })
        );
      })
    )
  );

  createRaffleSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(rafflesActions.createRaffleSuccess),
        tap(async () => {
          await this.toastController
            .create({
              message: 'Successfully created raffle!',
              duration: 2000,
              color: 'success',
            })
            .then((toast) => toast.present());

          this.modalController.dismiss(true, ModalDismissRole.Confirm);
        })
      ),
    { dispatch: false }
  );
}
