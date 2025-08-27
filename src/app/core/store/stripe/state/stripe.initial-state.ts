import { wrapAsAsyncData } from 'src/app/core/async-data';
import { StripeState } from './stripe.state';

export const INITIAL_STRIPE_STATE: StripeState = {
  customer: wrapAsAsyncData(undefined),
};
