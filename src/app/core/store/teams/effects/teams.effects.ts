import { inject, Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular/standalone';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, filter, map, Observable, of, switchMap, tap } from 'rxjs';
import { FormActionRoutes, PageRoutes } from 'src/app/app.routes';
import { TeamFactory } from 'src/app/core/models/Team.model';
import { TeamDetailFactory } from 'src/app/core/models/TeamDetail.model';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { TeamsService } from 'src/app/core/services/teams/teams.service';
import dataUrlToBlob, {
  isDataUrl,
} from 'src/app/shared/utils/data-url-to-blob.util';
import { RouterActions } from '../../router/actions/router.actions';
import { userFeature } from '../../user/feature/user.feature';
import { teamsActions } from '../actions/teams.actions';

@Injectable()
export class TeamsEffects {
  private readonly actions$ = inject(Actions);
  private readonly teamsService = inject(TeamsService);
  private readonly toastController = inject(ToastController);
  private readonly store = inject(Store);
  private readonly storageService = inject(StorageService);

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

  updateTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(teamsActions.updateTeam),
      switchMap((action) => {
        // Get logo URL
        let logoUrl$: Observable<string | null> = of(action.request.logo_url);

        if (
          action.request.logo_url !== null &&
          isDataUrl(action.request.logo_url)
        ) {
          const image: Blob = dataUrlToBlob(action.request.logo_url);
          logoUrl$ = this.storageService
            .uploadTeamLogo(action.request.id, image)
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

        return logoUrl$.pipe(
          switchMap((logoUrl) =>
            this.teamsService
              .updateTeam({ ...action.request, logo_url: logoUrl })
              .pipe(
                map((response) => {
                  if (response.error !== null) {
                    return teamsActions.updateTeamFailure({
                      teamId: action.request.id,
                      message: 'Failed to save changes',
                    });
                  }

                  return teamsActions.updateTeamSuccess({
                    teamDetails: TeamDetailFactory.fromDtoV1(response.data),
                  });
                }),
                catchError(() => {
                  return of(
                    teamsActions.updateTeamFailure({
                      teamId: action.request.id,
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

  updateTeamSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(teamsActions.updateTeamSuccess),
      switchMap(async (action) => {
        await this.toastController
          .create({
            message: 'Changes saved successfully',
            duration: 2000,
            color: 'success',
          })
          .then((toast) => toast.present());

        return RouterActions.routeInCurrentTab({
          url: [
            PageRoutes.TeamDetail,
            action.teamDetails.id,
            FormActionRoutes.View,
          ],
          animated: false,
          replaceUrl: true,
        });
      })
    )
  );
}
