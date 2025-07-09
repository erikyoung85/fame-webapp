import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular/standalone';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { isNotNil } from 'ramda';
import {
  catchError,
  distinctUntilChanged,
  filter,
  from,
  map,
  Observable,
  of,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { FormActionRoutes } from 'src/app/app.routes';
import { AsyncDataStatus } from 'src/app/core/models/AsyncData.model';
import { UserProfileFactory } from 'src/app/core/models/UserProfile.model';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { SupabaseService } from 'src/app/core/services/supabase/supabase.service';
import { PatchUserProfileRequestDtoV1 } from 'src/app/core/services/user-profile/dtos/requests/patch-user-profile.request.dto.v1';
import { UserProfileService } from 'src/app/core/services/user-profile/user-profile.service';
import { UserService } from 'src/app/core/services/user/user.service';
import dataUrlToBlob, {
  isDataUrl,
} from 'src/app/shared/utils/data-url-to-blob.util';
import { RouterActions } from '../../router/actions/router.actions';
import { userActions } from '../actions/user.actions';
import { userFeature } from '../feature/user.feature';

@Injectable()
export class UserEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly supabaseService = inject(SupabaseService);
  private readonly userService = inject(UserService);
  private readonly userProfileService = inject(UserProfileService);
  private readonly toastController = inject(ToastController);
  private readonly router = inject(Router);
  private readonly storageService = inject(StorageService);

  failureMessages$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          userActions.loadSessionFailure,
          userActions.loginFailure,
          userActions.signupFailure,
          userActions.updateUserProfileFailure,
          userActions.patchUserProfileFailure,
          userActions.getUserProfileFailure,
          userActions.resetPasswordFailure,
          userActions.logoutFailure
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

  loadSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.loadSession),
      switchMap(() => {
        return from(this.supabaseService.client.auth.getSession()).pipe(
          map((response) => {
            if (response.error) {
              return userActions.loadSessionFailure({
                message: response.error?.message,
              });
            }
            return userActions.loadSessionSuccess({
              session: response.data.session ?? undefined,
            });
          }),
          catchError((error: Error) => {
            return of(
              userActions.loadSessionFailure({
                message: error?.message,
              })
            );
          })
        );
      })
    )
  );

  loginWithPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.loginWithPassword),
      switchMap((action) => {
        return this.userService
          .loginWithPassword(action.email, action.password)
          .pipe(
            map((response) => {
              if (
                response.error ||
                !response.data.session ||
                !response.data.user
              ) {
                return userActions.loginFailure({
                  message: response.error?.message || 'Login failed',
                });
              }
              return userActions.loginSuccess({
                session: response.data.session,
              });
            }),
            catchError((error: Error) => {
              return of(
                userActions.loginFailure({
                  message: error?.message || 'Login failed',
                })
              );
            })
          );
      })
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userActions.loginSuccess),
        tap(async () => {
          await this.toastController
            .create({
              message: `Login Successful!`,
              duration: 2000,
              color: 'success',
            })
            .then((toast) => toast.present());

          await this.router.navigate(['']);
        })
      ),
    { dispatch: false }
  );

  signupWithPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.signupWithPassword),
      switchMap((action) => {
        return this.userService.signupWithPassword(action.request).pipe(
          map((response) => {
            if (
              response.error ||
              !response.data.session ||
              !response.data.user
            ) {
              return userActions.signupFailure({
                message: response.error?.message || 'Sign up failed',
              });
            }

            return userActions.signupSuccess({
              session: response.data.session,
            });
          }),
          catchError((error: Error) => {
            return of(
              userActions.signupFailure({
                message: error?.message || 'Sign up failed',
              })
            );
          })
        );
      })
    )
  );

  signupSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userActions.signupSuccess),
        tap(async () => {
          await this.toastController
            .create({
              message: 'Successfully created your account!',
              duration: 2000,
              color: 'success',
            })
            .then((toast) => toast.present());

          await this.router.navigate(['']);
        })
      ),
    { dispatch: false }
  );

  resetPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.resetPassword),
      switchMap((action) => {
        return this.userService.resetPasswordForEmail(action.email).pipe(
          map((response) => {
            if (response.error) {
              return userActions.resetPasswordFailure({
                message: response.error?.message || 'Password reset failed',
              });
            }
            return userActions.resetPasswordSuccess();
          }),
          catchError((error: Error) => {
            return of(
              userActions.resetPasswordFailure({
                message: error?.message || 'Password reset failed',
              })
            );
          })
        );
      })
    )
  );

  resetPasswordSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userActions.resetPasswordSuccess),
        tap(async () => {
          await this.toastController
            .create({
              message: 'A link has been sent to the provided email address',
              duration: 4000,
              color: 'success',
            })
            .then((toast) => toast.present());
        })
      ),
    { dispatch: false }
  );

  getUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.getUserProfile),
      withLatestFrom(this.store.select(userFeature.selectSession)),
      switchMap(([, sessionAsync]) => {
        const session = sessionAsync.data;
        if (session === undefined) {
          return of(
            userActions.getUserProfileFailure({ message: 'No session' })
          );
        }

        return this.userProfileService.getUserProfile(session.user.id).pipe(
          map((response) => {
            if (response.error) {
              return userActions.getUserProfileFailure({
                message: response.error.message || 'Failed to get profile',
              });
            }

            return userActions.getUserProfileSuccess({
              userProfile: UserProfileFactory.fromSessionAndProfileResponseDto(
                session,
                response.data
              ),
            });
          }),
          catchError((error: Error) => {
            return of(
              userActions.getUserProfileFailure({
                message: error?.message || 'Failed to get profile',
              })
            );
          })
        );
      })
    )
  );

  updateUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.updateUserProfile),
      withLatestFrom(
        this.store.select(userFeature.selectSession).pipe(
          map((async) => async.data),
          filter((session) => session !== undefined)
        )
      ),
      switchMap(([action, session]) => {
        // Get avatar URL
        let avatarUrl$: Observable<string | undefined> = of(
          action.userProfile.avatarUrl
        );

        if (
          action.userProfile.avatarUrl !== undefined &&
          isDataUrl(action.userProfile.avatarUrl)
        ) {
          const image: Blob = dataUrlToBlob(action.userProfile.avatarUrl);
          avatarUrl$ = this.storageService
            .uploadProfilePicture(session.user.id, image)
            .pipe(
              map((urlOrError) => {
                if (urlOrError instanceof Error) {
                  return undefined; // Handle error case
                }
                return urlOrError;
              }),
              catchError(() => of(undefined)) // Fallback in case of error
            );
        }

        // Update user profile
        return avatarUrl$.pipe(
          switchMap((avatarUrl) => {
            const request: PatchUserProfileRequestDtoV1 = {
              avatar_url: avatarUrl,
              first_name: action.userProfile.firstName,
              last_name: action.userProfile.lastName,
              favorite_team_id: action.userProfile.favoriteTeamId,
            };
            return this.userProfileService
              .patchUserProfile(action.userProfile.id, request)
              .pipe(
                map((response) => {
                  if (response.error) {
                    return userActions.updateUserProfileFailure({
                      message:
                        response.error.message || 'Failed to update profile',
                    });
                  }

                  return userActions.updateUserProfileSuccess({
                    userProfile:
                      UserProfileFactory.fromSessionAndProfileResponseDto(
                        session,
                        response.data
                      ),
                  });
                }),
                catchError((error: Error) => {
                  return of(
                    userActions.updateUserProfileFailure({
                      message: error?.message || 'Failed to update profile',
                    })
                  );
                })
              );
          })
        );
      })
    )
  );

  updateUserProfileSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.updateUserProfileSuccess),
      switchMap(async () => {
        await this.toastController
          .create({
            message: 'Successfully updated your profile!',
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

  patchUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.patchUserProfile),
      withLatestFrom(
        this.store.select(userFeature.selectSession).pipe(
          map((async) => async.data),
          filter((session) => session !== undefined)
        )
      ),
      switchMap(([action, session]) => {
        return this.userProfileService
          .patchUserProfile(session.user.id, action.request)
          .pipe(
            map((response) => {
              if (response.error) {
                return userActions.patchUserProfileFailure({
                  message: response.error.message || 'Failed to update profile',
                });
              }

              return userActions.patchUserProfileSuccess({
                userProfile:
                  UserProfileFactory.fromSessionAndProfileResponseDto(
                    session,
                    response.data
                  ),
              });
            }),
            catchError((error: Error) => {
              return of(
                userActions.patchUserProfileFailure({
                  message: error?.message || 'Failed to update profile',
                })
              );
            })
          );
      })
    )
  );

  getProfileOnUserIdChange$ = createEffect(() =>
    this.store.select(userFeature.selectSession).pipe(
      filter((async) =>
        [AsyncDataStatus.Success, AsyncDataStatus.Error].includes(async.status)
      ),
      map((sessionAsync) => sessionAsync.data?.user.id),
      distinctUntilChanged(),
      map((userId) => {
        return userId === undefined
          ? userActions.clearUserProfile()
          : userActions.getUserProfile();
      })
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.logout),
      switchMap(() => {
        return this.userService.logout().pipe(
          map((response) => {
            if (response.error) {
              return userActions.logoutFailure({
                message: response.error.message ?? 'Failed to logout',
              });
            }

            return userActions.logoutSuccess();
          }),
          catchError((error: Error) => {
            return of(
              userActions.logoutFailure({
                message: error.message ?? 'Failed to logout',
              })
            );
          })
        );
      })
    )
  );

  logoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userActions.logoutSuccess),
        tap(async () => {
          await this.toastController
            .create({
              message: 'Logout Successful!',
              duration: 2000,
              color: 'success',
            })
            .then((toast) => toast.present());

          await this.router.navigateByUrl('/');
        })
      ),
    { dispatch: false }
  );

  fetchUserPermissions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.fetchUserManagedPages),
      withLatestFrom(
        this.store.select(userFeature.selectUserId).pipe(filter(isNotNil))
      ),
      switchMap(([, userId]) => {
        return this.userProfileService.getManagedPages(userId).pipe(
          map((response) => {
            if (response instanceof Error) {
              return userActions.fetchUserManagedPagesFailure({
                message: response.message,
              });
            }

            return userActions.fetchUserManagedPagesSuccess(response);
          }),
          catchError((error: Error) => {
            return of(
              userActions.fetchUserManagedPagesFailure({
                message: error.message,
              })
            );
          })
        );
      })
    )
  );
}
