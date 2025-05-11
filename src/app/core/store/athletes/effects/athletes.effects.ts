import { inject, Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular/standalone';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { AthleteFactory } from 'src/app/core/models/Athlete.model';
import { AthleteDetailFactory } from 'src/app/core/models/AthleteDetail.model';
import { AthletesService } from 'src/app/core/services/athletes/athletes.service';
import { athletesActions } from '../actions/athletes.actions';

@Injectable()
export class AthletesEffects {
  private readonly actions$ = inject(Actions);
  private readonly athletesService = inject(AthletesService);
  private readonly toastController = inject(ToastController);

  failureMessages$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(athletesActions.fetchAthletesFailure),
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
}
