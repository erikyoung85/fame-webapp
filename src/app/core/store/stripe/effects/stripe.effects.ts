import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap } from 'rxjs';
import { StripeCustomerFactory } from 'src/app/core/models/StripeCustomer.model';
import { StripeApiService } from 'src/app/core/services/stripe/stripe-api.service';
import { stripeActions } from '../actions/stripe.actions';

@Injectable()
export class StripeEffects {
  private readonly actions$ = inject(Actions);
  private readonly stripeApiService = inject(StripeApiService);
  private readonly store = inject(Store);

  loadCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(stripeActions.loadCustomer),
      switchMap(() => {
        return this.stripeApiService.getCurrentUserCustomer().pipe(
          map((response) => {
            return stripeActions.loadCustomerSuccess({
              customer: StripeCustomerFactory.fromDtoV1(response),
            });
          }),
          catchError((error: Error) => {
            return of(
              stripeActions.loadCustomerFailure({
                message: error?.message,
              })
            );
          })
        );
      })
    )
  );
}
