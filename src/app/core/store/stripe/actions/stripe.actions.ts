import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { StripeCustomer } from 'src/app/core/models/StripeCustomer.model';

export const stripeActions = createActionGroup({
  source: 'Stripe',
  events: {
    'Load Customer': emptyProps(),
    'Load Customer Success': props<{ customer: StripeCustomer }>(),
    'Load Customer Failure': props<{ message: string }>(),
  },
});
