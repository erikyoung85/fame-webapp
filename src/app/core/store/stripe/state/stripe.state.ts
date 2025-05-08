import { AsyncData } from 'src/app/core/models/AsyncData.model';
import { StripeCustomer } from 'src/app/core/models/StripeCustomer.model';

export interface StripeState {
  customer: AsyncData<StripeCustomer | undefined>;
}
