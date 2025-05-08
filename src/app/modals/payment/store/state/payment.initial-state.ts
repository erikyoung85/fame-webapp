import { wrapAsAsyncData } from 'src/app/core/models/AsyncData.model';
import { PaymentTab } from '../../models/payment-tab.enum';
import { PaymentState } from './payment.state';

export const INITIAL_PAYMENT_STATE: PaymentState = {
  currentTab: PaymentTab.SendPayment,

  paymentIntent: wrapAsAsyncData(undefined),
  paymentStatus: undefined,
};
