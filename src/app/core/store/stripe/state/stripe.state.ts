import { AsyncData } from 'src/app/core/async-data';
import { StripeCustomer } from 'src/app/core/models/StripeCustomer.model';

export interface StripeState {
  customer: AsyncData<StripeCustomer | undefined>;
}
