import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular/standalone';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SignInWithPasswordCredentials } from '@supabase/supabase-js';
import { catchError, from, map, of, switchMap, tap } from 'rxjs';
import { SupabaseService } from 'src/app/core/services/supabase.service';
import { userActions } from '../actions/user.actions';

@Injectable()
export class UserEffects {
  private readonly actions$ = inject(Actions);
  private readonly supabaseService = inject(SupabaseService);
  private readonly toastController = inject(ToastController);
  private readonly router = inject(Router);

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

  loginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userActions.loginFailure),
        tap(async (action) => {
          await this.toastController
            .create({
              message: action.message,
              duration: 2000,
              color: 'danger',
            })
            .then((toast) => toast.present());
        })
      ),
    { dispatch: false }
  );
}
