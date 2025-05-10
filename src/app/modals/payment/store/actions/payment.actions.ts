import { PaymentSheetResultInterface } from '@capacitor-community/stripe';
import { createActionGroup, props } from '@ngrx/store';
import { StripePaymentIntent } from 'src/app/core/models/StripePaymentIntent.model';
import { CreatePayment } from '../../models/create-payment.model';
import { PaymentTab } from '../../payment.routes';

export const paymentActions = createActionGroup({
  source: 'Payment',
  events: {
    'Set Payment Tab': props<{ tab: PaymentTab }>(),

    'Create Payment Intent': props<{ sendPayment: CreatePayment }>(),
    'Create Payment Intent Success': props<{
      paymentIntent: StripePaymentIntent;
    }>(),
    'Create Payment Intent Failure': props<{ message: string }>(),

    'Collect Payment': props<{ paymentIntent: StripePaymentIntent }>(),
    'Collect Payment Success': props<{
      paymentStatus: PaymentSheetResultInterface;
    }>(),
    'Collect Payment Failure': props<{ message: string }>(),
  },
});
