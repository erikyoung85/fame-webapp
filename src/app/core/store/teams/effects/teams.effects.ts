import { inject, Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular/standalone';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, filter, map, of, switchMap, tap } from 'rxjs';
import { TeamFactory } from 'src/app/core/models/Team.model';
import { TeamDetailFactory } from 'src/app/core/models/TeamDetail.model';
import { TeamsService } from 'src/app/core/services/teams/teams.service';
import { userFeature } from '../../user/feature/user.feature';
import { teamsActions } from '../actions/teams.actions';

@Injectable()
export class TeamsEffects {
  private readonly actions$ = inject(Actions);
  private readonly teamsService = inject(TeamsService);
  private readonly toastController = inject(ToastController);
  private readonly store = inject(Store);

  failureMessages$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          teamsActions.fetchTeamsFailure,
          teamsActions.fetchTeamDetailsFailure
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

  fetchTeams$ = createEffect(() =>
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

  fetchTeamDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(teamsActions.fetchTeamDetails),
      switchMap((action) => {
        return this.teamsService.getTeamDetails(action.teamId).pipe(
          map((response) => {
            if (response.error !== null) {
              return teamsActions.fetchTeamDetailsFailure({
                teamId: action.teamId,
                message: response.error.message,
              });
            }

            return teamsActions.fetchTeamDetailsSuccess({
              teamId: action.teamId,
              teamDetails: TeamDetailFactory.fromDtoV1(response.data),
            });
          }),
          catchError((error: Error) => {
            return of(
              teamsActions.fetchTeamDetailsFailure({
                teamId: action.teamId,
                message: error?.message,
              })
            );
          })
        );
      })
    )
  );

  fetchFavoriteTeam$ = createEffect(() =>
    this.store.select(userFeature.selectFavoriteTeamId).pipe(
      filter((favoriteTeamId) => favoriteTeamId !== undefined),
      map((favoriteTeamId) => {
        return teamsActions.fetchTeamDetails({ teamId: favoriteTeamId });
      })
    )
  );
}
