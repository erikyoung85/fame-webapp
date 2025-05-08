import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, from, map, of, switchMap, withLatestFrom } from 'rxjs';
import { StripePaymentIntentFactory } from 'src/app/core/models/StripePaymentIntent.model';
import { CreatePaymentIntentRequestDtoV1 } from 'src/app/core/services/stripe/dtos/requests/create-payment-intent.request.dto.v1';
import { StripeApiService } from 'src/app/core/services/stripe/stripe-api.service';
import { StripeService } from 'src/app/core/services/stripe/stripe.service';
import { stripeFeature } from 'src/app/core/store/stripe/feature/stripe.feature';
import { paymentActions } from '../actions/payment.actions';

@Injectable()
export class PaymentEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly stripeService = inject(StripeService);
  private readonly stripeApiService = inject(StripeApiService);

  getPaymentIntent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(paymentActions.getPaymentIntent),
      withLatestFrom(this.store.select(stripeFeature.selectCustomer)),
      switchMap(([action, customer]) => {
        const request: CreatePaymentIntentRequestDtoV1 = {
          amount: action.sendPayment.amount,
          customerId: customer?.data?.id,
        };
        return this.stripeApiService.createPaymentIntent(request).pipe(
          map((response) => {
            return paymentActions.getPaymentIntentSuccess({
              paymentIntent: StripePaymentIntentFactory.fromDtoV1(response),
            });
          }),
          catchError((error: Error) => {
            return of(
              paymentActions.getPaymentIntentFailure({
                message: error.message,
              })
            );
          })
        );
      })
    )
  );

  showSheetForPaymentIntent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(paymentActions.getPaymentIntentSuccess),
      map((action) =>
        paymentActions.collectPayment({ paymentIntent: action.paymentIntent })
      )
    )
  );

  collectPayment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(paymentActions.collectPayment),
      switchMap((action) => {
        return from(
          this.stripeService.createPaymentSheet({
            paymentIntentClientSecret: action.paymentIntent.clientSecret,
            customerEphemeralKeySecret: action.paymentIntent.ephemeralKey,
            customerId: action.paymentIntent.customerId,
          })
        ).pipe(
          map((response) => {
            if (response === undefined) {
              return paymentActions.collectPaymentFailure({
                message: 'responded with undefined for payment status',
              });
            }
            return paymentActions.collectPaymentSuccess({
              paymentStatus: response,
            });
          }),
          catchError((error: Error) => {
            return of(
              paymentActions.collectPaymentFailure({
                message: error.message,
              })
            );
          })
        );
      })
    )
  );
}
