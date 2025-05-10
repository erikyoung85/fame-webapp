import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Athlete } from 'src/app/core/models/Athlete.model';
import { StripeCustomer } from 'src/app/core/models/StripeCustomer.model';

export const stripeActions = createActionGroup({
  source: 'Stripe',
  events: {
    'Load Customer': emptyProps(),
    'Load Customer Success': props<{ customer: StripeCustomer }>(),
    'Load Customer Failure': props<{ message: string }>(),

    'Open Payment Modal': props<{ athlete: Athlete }>(),
  },
});
