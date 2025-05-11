import { wrapAsAsyncData } from 'src/app/core/models/AsyncData.model';
import { PaymentTab } from '../../payment.routes';
import { PaymentState } from './payment.state';

export const INITIAL_PAYMENT_STATE: PaymentState = {
  currentTab: PaymentTab.CreatePayment,

  paymentIntent: wrapAsAsyncData(undefined),
  paymentStatus: undefined,
};
