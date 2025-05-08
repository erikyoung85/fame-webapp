import { createFeature } from '@ngrx/store';
import { stripeReducer } from '../reducers/stripe.reducer';

export const stripeFeature = createFeature({
  name: 'stripe',
  reducer: stripeReducer,
})
