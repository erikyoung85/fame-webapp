import { inject, Injectable } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular/standalone';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { isNil } from 'ramda';
import { catchError, combineLatest, from, map, of, switchMap, tap } from 'rxjs';
import { FormActionRoutes } from 'src/app/app.routes';
import { RaffleFactory } from 'src/app/core/models/Raffle.model';
import { LoadingOverlayService } from 'src/app/core/services/loading-overlay/loading-overlay.service';
import { ModalDismissRole } from 'src/app/core/services/modal-service/modal.service';
import { CreateRaffleRequestDtoV1 } from 'src/app/core/services/raffle/dtos/requests/create-raffle.request.dto.v1';
import { UpdateRaffleRequestDtoV1 } from 'src/app/core/services/raffle/dtos/requests/update-raffle.request.dto.v1';
import { RaffleService } from 'src/app/core/services/raffle/raffle.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { FilePickerFileUrlType } from 'src/app/shared/components/form-file-picker/form-file-picker.component';
import dataUrlToBlob, {
  isDataUrl,
} from 'src/app/shared/utils/data-url-to-blob.util';
import { generateUUID } from 'src/app/shared/utils/generate-uuid.util';
import { RouterActions } from '../../router/actions/router.actions';
import { rafflesActions } from '../actions/raffles.actions';

@Injectable()
export class RafflesEffects {
  private readonly actions$ = inject(Actions);
  private readonly toastController = inject(ToastController);
  private readonly raffleService = inject(RaffleService);
  private readonly modalController = inject(ModalController);
  private readonly storageService = inject(StorageService);
  private readonly loadingService = inject(LoadingOverlayService);

  failureMessages$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          rafflesActions.fetchRaffleFailure,
          rafflesActions.fetchRafflesForAthleteFailure,
          rafflesActions.createRaffleFailure,
          rafflesActions.updateRaffleFailure
        ),
        tap(async (action) => {
          this.loadingService.hideLoadingOverlay();
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

  fetchRafflesForAthlete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(rafflesActions.fetchRafflesForAthlete),
      switchMap((action) => {
        return this.raffleService.getRafflesForAthlete(action.athleteId).pipe(
          map((response) => {
            if (response.error !== null) {
              return rafflesActions.fetchRafflesForAthleteFailure({
                message: response.error.message,
              });
            }

            return rafflesActions.fetchRafflesForAthleteSuccess({
              raffles: response.data.map(RaffleFactory.fromDtoV1),
            });
          }),
          catchError((error: Error) => {
            return of(
              rafflesActions.fetchRafflesForAthleteFailure({
                message: error.message,
              })
            );
          })
        );
      })
    )
  );

  fetchRaffle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(rafflesActions.fetchRaffle),
      switchMap((action) => {
        return this.raffleService.getRaffle(action.raffleId).pipe(
          map((response) => {
            if (response.error !== null) {
              return rafflesActions.fetchRaffleFailure({
                raffleId: action.raffleId,
                message: response.error.message,
              });
            }

            return rafflesActions.fetchRaffleSuccess({
              raffle: RaffleFactory.fromDtoV1(response.data),
            });
          }),
          catchError((error: Error) => {
            return of(
              rafflesActions.fetchRaffleFailure({
                raffleId: action.raffleId,
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
        this.loadingService.showLoadingOverlay();

        const newRaffleId = action.request.id ?? generateUUID();

        const thumbnailUrl$ = isDataUrl(action.request.prizeThumbnail)
          ? this.storageService
              .uploadRaffleThumbnail(
                newRaffleId,
                dataUrlToBlob(action.request.prizeThumbnail)
              )
              .pipe(
                catchError(() => of(new Error('Failed to upload thumbnail')))
              )
          : of(action.request.prizeThumbnail);

        const prizeVideoUrl$ =
          action.request.prizeVideo.urlType === FilePickerFileUrlType.Local
            ? from(
                this.storageService
                  .uploadRafflePrize(newRaffleId, action.request.prizeVideo)
                  .catch(() => new Error('Failed to upload prize video'))
              )
            : of(action.request.prizeVideo.url);

        return combineLatest([prizeVideoUrl$, thumbnailUrl$]).pipe(
          switchMap(([prizeVideoUrl, thumbnailUrl]) => {
            if (isNil(thumbnailUrl) || thumbnailUrl instanceof Error) {
              return of(
                rafflesActions.createRaffleFailure({
                  message: 'Failed to upload thumbnail.',
                })
              );
            }
            if (isNil(prizeVideoUrl) || prizeVideoUrl instanceof Error) {
              return of(
                rafflesActions.createRaffleFailure({
                  message: 'Failed to upload prize video.',
                })
              );
            }

            const request: CreateRaffleRequestDtoV1 = {
              id: newRaffleId,
              title: action.request.title,
              description: action.request.description ?? null,
              start_date: action.request.startDate,
              end_date: action.request.endDate,
              athletes_id: action.request.athleteId,
              prize_thumbnail: thumbnailUrl,
              prize_video_url: prizeVideoUrl,
            };
            return this.raffleService.createRaffle(request).pipe(
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
        );
      })
    )
  );
  createRaffleSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(rafflesActions.createRaffleSuccess),
        tap(async () => {
          this.loadingService.hideLoadingOverlay();
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

  updateRaffle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(rafflesActions.updateRaffle),
      switchMap((action) => {
        this.loadingService.showLoadingOverlay();

        const thumbnailUrl$ = isDataUrl(action.request.prizeThumbnail)
          ? this.storageService
              .uploadRaffleThumbnail(
                action.request.id,
                dataUrlToBlob(action.request.prizeThumbnail)
              )
              .pipe(
                catchError(() => of(new Error('Failed to upload thumbnail')))
              )
          : of(action.request.prizeThumbnail);

        const prizeVideoUrl$ =
          action.request.prizeVideo.urlType === FilePickerFileUrlType.Local
            ? from(
                this.storageService.uploadRafflePrize(
                  action.request.id,
                  action.request.prizeVideo
                )
              )
            : of(action.request.prizeVideo.url);

        return combineLatest([prizeVideoUrl$, thumbnailUrl$]).pipe(
          switchMap(([prizeVideoUrl, thumbnailUrl]) => {
            if (isNil(thumbnailUrl) || thumbnailUrl instanceof Error) {
              return of(
                rafflesActions.updateRaffleFailure({
                  message: 'Failed to upload thumbnail.',
                })
              );
            }
            if (isNil(prizeVideoUrl) || prizeVideoUrl instanceof Error) {
              return of(
                rafflesActions.updateRaffleFailure({
                  message: 'Failed to upload prize video.',
                })
              );
            }

            const updatedRequest: UpdateRaffleRequestDtoV1 = {
              id: action.request.id,
              athletes_id: action.request.athlete.id,
              title: action.request.title,
              description: action.request.description ?? null,
              start_date: action.request.startDate,
              end_date: action.request.endDate,
              prize_thumbnail: thumbnailUrl,
              prize_video_url: prizeVideoUrl,
            };
            return this.raffleService.updateRaffle(updatedRequest).pipe(
              map((response) => {
                if (response.error !== null) {
                  return rafflesActions.updateRaffleFailure({
                    message: response.error.message,
                  });
                }

                return rafflesActions.updateRaffleSuccess({
                  raffle: RaffleFactory.fromDtoV1(response.data),
                });
              }),
              catchError((error: Error) => {
                return of(
                  rafflesActions.updateRaffleFailure({
                    message: error.message,
                  })
                );
              })
            );
          })
        );
      })
    )
  );

  updateRaffleSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(rafflesActions.updateRaffleSuccess),
      switchMap(async () => {
        this.loadingService.hideLoadingOverlay();
        await this.toastController
          .create({
            message: 'Successfully updated raffle!',
            duration: 2000,
            color: 'success',
          })
          .then((toast) => toast.present());

        return RouterActions.routeToFormAction({
          formAction: FormActionRoutes.View,
        });
      })
    )
  );

  fetchTrendingRaffles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(rafflesActions.fetchTrendingRaffles),
      switchMap(() => {
        return this.raffleService.getTrendingRaffles().pipe(
          map((response) => {
            if (response.error !== null) {
              return rafflesActions.fetchTrendingRafflesFailure({
                message: response.error.message,
              });
            }

            return rafflesActions.fetchTrendingRafflesSuccess({
              raffles: response.data.map(RaffleFactory.fromDtoV1),
            });
          }),
          catchError((error: Error) => {
            return of(
              rafflesActions.fetchTrendingRafflesFailure({
                message: error.message,
              })
            );
          })
        );
      })
    )
  );
}
