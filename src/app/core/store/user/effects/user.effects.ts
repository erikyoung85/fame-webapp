import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular/standalone';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  catchError,
  filter,
  from,
  map,
  of,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { AppRoutes } from 'src/app/app.routes';
import { UserProfileFactory } from 'src/app/core/models/UserProfile.model';
import { SupabaseService } from 'src/app/core/services/supabase/supabase.service';
import { UpdateUserProfileRequestDtoV1 } from 'src/app/core/services/user-profile/dtos/requests/update-user-profile.request.dto.v1';
import { UserProfileService } from 'src/app/core/services/user-profile/user-profile.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { UserProfileRoutes } from 'src/app/pages/user-profile/user-profile.routes';
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

  failureMessages$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          userActions.loadSessionFailure,
          userActions.loginFailure,
          userActions.signupFailure,
          userActions.updateUserProfileFailure,
          userActions.getUserProfileFailure,
          userActions.resetPasswordFailure
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
      switchMap((action) => {
        return from(this.supabaseService.client.auth.getSession()).pipe(
          map((response) => {
            if (response.error || !response.data.session) {
              return userActions.loadSessionFailure({
                message: response.error?.message,
              });
            }
            return userActions.loadSessionSuccess({
              session: response.data.session,
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
                userProfile: UserProfileFactory.fromSupabaseUser(
                  response.data.user
                ),
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
        tap(async (action) => {
          await this.toastController
            .create({
              message: `Welcome back ${action.userProfile.firstName}!`,
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
              userProfile: UserProfileFactory.fromSupabaseUser(
                response.data.user
              ),
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
      withLatestFrom(
        this.store.select(userFeature.selectSession).pipe(
          map((async) => async.data),
          filter((session) => session !== undefined)
        )
      ),
      switchMap(([action, session]) => {
        return this.userProfileService.getUserProfile(action.userId).pipe(
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
        const request: UpdateUserProfileRequestDtoV1 = {
          first_name: action.userProfile.firstName,
          last_name: action.userProfile.lastName,
        };
        return this.userProfileService
          .updateUserProfile(action.userProfile.id, request)
          .pipe(
            map((response) => {
              if (response.error) {
                return userActions.updateUserProfileFailure({
                  message: response.error.message || 'Failed to update profile',
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
    )
  );

  updateUserProfileSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userActions.updateUserProfileSuccess),
        tap(async () => {
          await this.toastController
            .create({
              message: 'Successfully updated your profile!',
              duration: 2000,
              color: 'success',
            })
            .then((toast) => toast.present());

          await this.router.navigate([
            AppRoutes.UserProfile,
            UserProfileRoutes.View,
          ]);
        })
      ),
    { dispatch: false }
  );

  getProfileOnUserIdChange$ = createEffect(() =>
    this.store.select(userFeature.selectUserId).pipe(
      filter((userId) => userId !== undefined),
      map((userId) => {
        return userActions.getUserProfile({ userId: userId });
      })
    )
  );
}
