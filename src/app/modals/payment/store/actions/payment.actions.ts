import { PaymentSheetResultInterface } from '@capacitor-community/stripe';
import { createActionGroup, props } from '@ngrx/store';
import { StripePaymentIntent } from 'src/app/core/models/StripePaymentIntent.model';
import { PaymentTab } from '../../models/payment-tab.enum';
import { SendPayment } from '../../models/send-payment.model';

export const paymentActions = createActionGroup({
  source: 'Payment',
  events: {
    'Set Payment Tab': props<{ tab: PaymentTab }>(),

    'Get Payment Intent': props<{ sendPayment: SendPayment }>(),
    'Get Payment Intent Success': props<{
      paymentIntent: StripePaymentIntent;
    }>(),
    'Get Payment Intent Failure': props<{ message: string }>(),

    'Collect Payment': props<{ paymentIntent: StripePaymentIntent }>(),
    'Collect Payment Success': props<{
      paymentStatus: PaymentSheetResultInterface;
    }>(),
    'Collect Payment Failure': props<{ message: string }>(),
  },
});
