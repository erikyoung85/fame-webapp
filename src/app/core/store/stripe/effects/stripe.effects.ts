import { inject, Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { StripeCustomerFactory } from 'src/app/core/models/StripeCustomer.model';
import { StripeApiService } from 'src/app/core/services/stripe/stripe-api.service';
import { stripeActions } from '../actions/stripe.actions';

@Injectable()
export class StripeEffects {
  private readonly actions$ = inject(Actions);
  private readonly stripeApiService = inject(StripeApiService);
  private readonly modalController = inject(ModalController);

  loadCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(stripeActions.loadCustomerForUser),
      switchMap(() => {
        return this.stripeApiService.getCurrentUserCustomer().pipe(
          map((response) => {
            return stripeActions.loadCustomerForUserSuccess({
              customer: StripeCustomerFactory.fromDtoV1(response),
            });
          }),
          catchError((error: Error) => {
            return of(
              stripeActions.loadCustomerForUserFailure({
                message: error?.message,
              })
            );
          })
        );
      })
    )
  );
}
