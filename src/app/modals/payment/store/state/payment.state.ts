import { PaymentSheetResultInterface } from '@capacitor-community/stripe';
import { AsyncData } from 'src/app/core/async-data';
import { StripePaymentIntent } from 'src/app/core/models/StripePaymentIntent.model';
import { PaymentTab } from '../../payment.routes';

export interface PaymentState {
  currentTab: PaymentTab;
  paymentIntent: AsyncData<StripePaymentIntent | undefined>;
  paymentStatus: PaymentSheetResultInterface | undefined;
}
