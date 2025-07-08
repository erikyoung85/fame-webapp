import { inject, Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular/standalone';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  catchError,
  from,
  map,
  of,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { StripePaymentIntentFactory } from 'src/app/core/models/StripePaymentIntent.model';
import { CreatePaymentIntentRequestDtoV1 } from 'src/app/core/services/stripe/dtos/requests/create-payment-intent.request.dto.v1';
import { UpdatePaymentIntentRequestDtoV1 } from 'src/app/core/services/stripe/dtos/requests/update-payment-intent.request.dto.v1';
import { StripeApiService } from 'src/app/core/services/stripe/stripe-api.service';
import { StripeService } from 'src/app/core/services/stripe/stripe.service';
import { PaymentTab } from '../../payment.routes';
import { paymentActions } from '../actions/payment.actions';
import { paymentFeature } from '../feature/payment.feature';

@Injectable()
export class PaymentEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly stripeService = inject(StripeService);
  private readonly stripeApiService = inject(StripeApiService);
  private readonly toastController = inject(ToastController);

  createPaymentIntent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(paymentActions.createPaymentIntent),
      switchMap((action) => {
        const request: CreatePaymentIntentRequestDtoV1 = {
          customerId: action.customerId,
          raffleId: action.sendPayment.raffleId,
          amount: action.sendPayment.amount,
          message: action.sendPayment.message,
        };
        return this.stripeApiService.createPaymentIntent(request).pipe(
          map((response) => {
            return paymentActions.createPaymentIntentSuccess({
              paymentIntent: StripePaymentIntentFactory.fromDtoV1(response),
            });
          }),
          catchError((error: Error) => {
            return of(
              paymentActions.createPaymentIntentFailure({
                message: error.message,
              })
            );
          })
        );
      })
    )
  );
  createPaymentIntentFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(paymentActions.createPaymentIntentFailure),
        tap(async () => {
          await this.toastController
            .create({
              message: 'Failed to initiate payment.',
              duration: 2000,
              color: 'danger',
            })
            .then((toast) => toast.present());
        })
      ),
    { dispatch: false }
  );

  updatePaymentIntent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(paymentActions.updatePaymentIntent),
      withLatestFrom(this.store.select(paymentFeature.selectPaymentIntent)),
      switchMap(([action, paymentIntentAsync]) => {
        const paymentIntent = paymentIntentAsync.data;
        if (paymentIntent === undefined) {
          return of(
            paymentActions.updatePaymentIntentFailure({
              message: 'Payment intent is undefined',
            })
          );
        }

        const request: UpdatePaymentIntentRequestDtoV1 = {
          id: paymentIntent.id,
          customerId: action.customerId,
          raffleId: action.sendPayment.raffleId,
          amount: action.sendPayment.amount,
          message: action.sendPayment.message,
        };
        return this.stripeApiService.updatePaymentIntent(request).pipe(
          map((response) => {
            return paymentActions.updatePaymentIntentSuccess({
              paymentIntent: StripePaymentIntentFactory.fromDtoV1(response),
            });
          }),
          catchError((error: Error) => {
            return of(
              paymentActions.updatePaymentIntentFailure({
                message: error.message,
              })
            );
          })
        );
      })
    )
  );
  updatePaymentIntentFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(paymentActions.updatePaymentIntentFailure),
        tap(async () => {
          await this.toastController
            .create({
              message: 'Failed to update payment details.',
              duration: 2000,
              color: 'danger',
            })
            .then((toast) => toast.present());
        })
      ),
    { dispatch: false }
  );

  createOrUpdatePaymentIntentSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        paymentActions.createPaymentIntentSuccess,
        paymentActions.updatePaymentIntentSuccess
      ),
      map(() => {
        return paymentActions.setPaymentTab({ tab: PaymentTab.ConfirmPayment });
      })
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
  collectPaymentSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(paymentActions.collectPaymentSuccess),
      map(() =>
        paymentActions.setPaymentTab({
          tab: PaymentTab.PaymentSuccess,
        })
      )
    )
  );
  collectPaymentFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(paymentActions.collectPaymentFailure),
        tap(async () => {
          await this.toastController
            .create({
              message: 'Failed to process payment.',
              duration: 2000,
              color: 'danger',
            })
            .then((toast) => toast.present());
        })
      ),
    { dispatch: false }
  );
}
