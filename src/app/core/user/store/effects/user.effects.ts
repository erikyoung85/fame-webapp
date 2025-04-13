import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular/standalone';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from '@supabase/supabase-js';
import { catchError, from, map, of, switchMap, tap } from 'rxjs';
import { SupabaseService } from 'src/app/core/services/supabase.service';
import { userActions } from '../actions/user.actions';

@Injectable()
export class UserEffects {
  private readonly actions$ = inject(Actions);
  private readonly supabaseService = inject(SupabaseService);
  private readonly toastController = inject(ToastController);
  private readonly router = inject(Router);

  authFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          userActions.loadSessionFailure,
          userActions.loginFailure,
          userActions.signupFailure
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
        const request: SignInWithPasswordCredentials = {
          email: action.email,
          password: action.password,
        };

        return from(
          this.supabaseService.client.auth.signInWithPassword(request)
        ).pipe(
          map((response) => {
            if (response.error || !response.data.session) {
              return userActions.loginFailure({
                message: response.error?.message || 'Login failed',
              });
            }
            return userActions.loginSuccess({ session: response.data.session });
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
              message: 'Login successful!',
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
        const request: SignUpWithPasswordCredentials = {
          email: action.email,
          password: action.password,
        };

        return from(this.supabaseService.client.auth.signUp(request)).pipe(
          map((response) => {
            if (response.error || !response.data.session) {
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
        return from(
          this.supabaseService.client.auth.resetPasswordForEmail(action.email)
        ).pipe(
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
}
