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
  mergeMap,
  Observable,
  of,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import {
  AppRoutes,
  FormActionRoutes,
  PageRoutes,
  TabRoutes,
} from 'src/app/app.routes';
import { AsyncDataStatus } from 'src/app/core/async-data';
import { RaffleFactory } from 'src/app/core/models/Raffle.model';
import { UserProfileFactory } from 'src/app/core/models/UserProfile.model';
import { ModalService } from 'src/app/core/services/modal-service/modal.service';
import { RaffleService } from 'src/app/core/services/raffle/raffle.service';
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
  private readonly raffleService = inject(RaffleService);
  private readonly modalService = inject(ModalService);

  failureMessages$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          userActions.loadSessionFailure,
          userActions.loginFailure,
          userActions.loginWithTokenHashFailure,
          userActions.signupFailure,
          userActions.updateUserProfileFailure,
          userActions.patchUserProfileFailure,
          userActions.getUserProfileFailure,
          userActions.forgotPasswordFailure,
          userActions.logoutFailure,
          userActions.changePasswordFailure
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

  listenForTokenRefresh$ = createEffect(() =>
    this.supabaseService.tokenRefreshed$.pipe(
      map((session) => {
        return userActions.setSession({ session });
      })
    )
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

  loginWithTokenHash$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.loginWithTokenHash),
      switchMap((action) => {
        return this.userService
          .loginWithTokenHash(action.tokenHash, action.otpType)
          .pipe(
            map((response) => {
              if (
                response.error ||
                !response.data.session ||
                !response.data.user
              ) {
                return userActions.loginWithTokenHashFailure({
                  message: response.error?.message || 'Token login failed',
                });
              }
              return userActions.loginWithTokenHashSuccess({
                session: response.data.session,
                redirectUrl: action.redirectUrl,
              });
            }),
            catchError((error: Error) => {
              return of(
                userActions.loginWithTokenHashFailure({
                  message: error?.message || 'Token login failed',
                })
              );
            })
          );
      })
    )
  );
  loginWithTokenHashSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userActions.loginWithTokenHashSuccess),
        tap(async (action) => {
          if (action.redirectUrl !== undefined) {
            await this.router.navigate([action.redirectUrl]);
          }
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
            if (response.error) {
              return userActions.signupFailure({
                message: response.error.message || 'Sign up failed',
              });
            }

            return userActions.signupSuccess();
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

  signupSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.signupSuccess),
      mergeMap(async () => {
        await this.modalService.openConfirmEmailDialog();

        return RouterActions.routeInCurrentTab({
          url: PageRoutes.Login,
          replaceUrl: true,
        });
      })
    )
  );

  forgotPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.forgotPassword),
      switchMap((action) => {
        return this.userService.resetPasswordForEmail(action.email).pipe(
          map((response) => {
            if (response.error) {
              return userActions.forgotPasswordFailure({
                message: response.error?.message || 'Password reset failed',
              });
            }
            return userActions.forgotPasswordSuccess();
          }),
          catchError((error: Error) => {
            return of(
              userActions.forgotPasswordFailure({
                message: error?.message || 'Password reset failed',
              })
            );
          })
        );
      })
    )
  );

  forgotPasswordSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userActions.forgotPasswordSuccess),
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

  changePassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.changePassword),
      switchMap((action) => {
        return this.userService.changePassword(action.newPassword).pipe(
          map((response) => {
            if (response.error) {
              return userActions.changePasswordFailure({
                message: response.error?.message || 'Password change failed',
              });
            }
            return userActions.changePasswordSuccess();
          }),
          catchError((error: Error) => {
            return of(
              userActions.changePasswordFailure({
                message: error?.message || 'Password change failed',
              })
            );
          })
        );
      })
    )
  );
  changePasswordSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.changePasswordSuccess),
      switchMap(async () => {
        await this.toastController
          .create({
            message: 'Your password has been changed successfully',
            duration: 4000,
            color: 'success',
          })
          .then((toast) => toast.present());

        return RouterActions.route({
          url: [AppRoutes.Tabs, TabRoutes.Account],
        });
      })
    )
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

  getUserManagedPagesOnUserIdChange$ = createEffect(() =>
    this.store.select(userFeature.selectUserId).pipe(
      distinctUntilChanged(),
      filter(isNotNil),
      map(() => userActions.fetchUserManagedPages())
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

  fetchUserEnteredRaffles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.fetchUserEnteredRaffles),
      withLatestFrom(
        this.store.select(userFeature.selectUserId).pipe(filter(isNotNil))
      ),
      switchMap(([, userId]) => {
        return this.raffleService.getUserEnteredRaffles(userId).pipe(
          map((response) => {
            if (response.error !== null) {
              return userActions.fetchUserEnteredRafflesFailure({
                message: 'Failed to fetch entered raffles',
              });
            }

            return userActions.fetchUserEnteredRafflesSuccess({
              raffles: response.data.map(RaffleFactory.fromDtoV1),
            });
          }),
          catchError(() => {
            return of(
              userActions.fetchUserEnteredRafflesFailure({
                message: 'Failed to fetch entered raffles',
              })
            );
          })
        );
      })
    )
  );

  fetchUserManagedPages$ = createEffect(() =>
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
