import { inject, Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular/standalone';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { TeamFactory } from 'src/app/core/models/Team.model';
import { TeamsService } from 'src/app/core/services/teams/teams.service';
import { teamsActions } from '../actions/teams.actions';

@Injectable()
export class TeamsEffects {
  private readonly actions$ = inject(Actions);
  private readonly teamsService = inject(TeamsService);
  private readonly toastController = inject(ToastController);

  failureMessages$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(teamsActions.fetchTeamsFailure),
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

  loadSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(teamsActions.fetchTeams),
      switchMap(() => {
        return this.teamsService.getAllTeams().pipe(
          map((response) => {
            if (response.error !== null) {
              return teamsActions.fetchTeamsFailure({
                message: response.error.message,
              });
            }

            return teamsActions.fetchTeamsSuccess({
              teams: response.data.map(TeamFactory.fromDtoV1),
            });
          }),
          catchError((error: Error) => {
            return of(
              teamsActions.fetchTeamsFailure({
                message: error?.message,
              })
            );
          })
        );
      })
    )
  );
}
