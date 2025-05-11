import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Athlete } from 'src/app/core/models/Athlete.model';
import { StripeCustomer } from 'src/app/core/models/StripeCustomer.model';

export const stripeActions = createActionGroup({
  source: 'Stripe',
  events: {
    'Load Customer For User': emptyProps(),
    'Load Customer For User Success': props<{ customer: StripeCustomer }>(),
    'Load Customer For User Failure': props<{ message: string }>(),

    'Open Payment Modal': props<{ athlete: Athlete }>(),
  },
});
