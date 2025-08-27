import { inject, Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular/standalone';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { FormActionRoutes } from 'src/app/app.routes';
import { AthleteFactory } from 'src/app/core/models/Athlete.model';
import { AthleteDetailFactory } from 'src/app/core/models/AthleteDetail.model';
import { AthletesService } from 'src/app/core/services/athletes/athletes.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import dataUrlToBlob, {
  isDataUrl,
} from 'src/app/shared/utils/data-url-to-blob.util';
import { RouterActions } from '../../router/actions/router.actions';
import { athletesActions } from '../actions/athletes.actions';

@Injectable()
export class AthletesEffects {
  private readonly actions$ = inject(Actions);
  private readonly athletesService = inject(AthletesService);
  private readonly toastController = inject(ToastController);
  private readonly storageService = inject(StorageService);
  private readonly store = inject(Store);

  failureMessages$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          athletesActions.fetchAthletesFailure,
          athletesActions.updateAthleteFailure
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

  fetchAthletes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(athletesActions.fetchAthletes),
      switchMap(() => {
        return this.athletesService.getAllAthletes().pipe(
          map((response) => {
            if (response.error !== null) {
              return athletesActions.fetchAthletesFailure({
                message: response.error.message,
              });
            }

            return athletesActions.fetchAthletesSuccess({
              athletes: response.data.map(AthleteFactory.fromDtoV1),
            });
          }),
          catchError((error: Error) => {
            return of(
              athletesActions.fetchAthletesFailure({
                message: error.message,
              })
            );
          })
        );
      })
    )
  );

  fetchAthleteDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(athletesActions.fetchAthleteDetails),
      switchMap((action) => {
        return this.athletesService.getAthleteDetail(action.athleteId).pipe(
          map((response) => {
            if (response.error !== null) {
              return athletesActions.fetchAthleteDetailsFailure({
                athleteId: action.athleteId,
                message: response.error.message,
              });
            }

            return athletesActions.fetchAthleteDetailsSuccess({
              athleteDetails: AthleteDetailFactory.fromDtoV1(response.data),
            });
          }),
          catchError((error: Error) => {
            return of(
              athletesActions.fetchAthleteDetailsFailure({
                athleteId: action.athleteId,
                message: error.message,
              })
            );
          })
        );
      })
    )
  );

  updateAthlete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(athletesActions.updateAthlete),
      switchMap((action) => {
        // Get avatar URL
        let avatarUrl$: Observable<string | null> = of(
          action.request.avatar_url
        );

        if (
          action.request.avatar_url !== null &&
          isDataUrl(action.request.avatar_url)
        ) {
          const image: Blob = dataUrlToBlob(action.request.avatar_url);
          avatarUrl$ = this.storageService
            .uploadAthleteAvatar(action.request.id, image)
            .pipe(
              map((urlOrError) => {
                if (urlOrError instanceof Error) {
                  return null; // Handle error case
                }
                return urlOrError;
              }),
              catchError(() => of(null)) // Fallback in case of error
            );
        }

        return avatarUrl$.pipe(
          switchMap((avatarUrl) =>
            this.athletesService
              .updateAthlete({ ...action.request, avatar_url: avatarUrl })
              .pipe(
                map((response) => {
                  if (response.error !== null) {
                    return athletesActions.updateAthleteFailure({
                      athleteId: action.request.id,
                      message: 'Failed to save changes',
                    });
                  }

                  return athletesActions.updateAthleteSuccess({
                    athleteDetails: AthleteDetailFactory.fromDtoV1(
                      response.data
                    ),
                  });
                }),
                catchError(() => {
                  return of(
                    athletesActions.updateAthleteFailure({
                      athleteId: action.request.id,
                      message: 'Failed to save changes',
                    })
                  );
                })
              )
          )
        );
      })
    )
  );

  updateAthleteSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(athletesActions.updateAthleteSuccess),
      switchMap(async (action) => {
        await this.toastController
          .create({
            message: 'Changes saved successfully',
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

  fetchTrendingAthletes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(athletesActions.fetchTrendingAthletes),
      switchMap(() => {
        return this.athletesService.getTrendingAthletes().pipe(
          map((response) => {
            if (response.error !== null) {
              return athletesActions.fetchTrendingAthletesFailure({
                message: response.error.message,
              });
            }

            return athletesActions.fetchTrendingAthletesSuccess({
              athletes: response.data.map(AthleteFactory.fromDtoV1),
            });
          }),
          catchError((error: Error) => {
            return of(
              athletesActions.fetchTrendingAthletesFailure({
                message: error.message,
              })
            );
          })
        );
      })
    )
  );
}
