import { createFeature } from '@ngrx/store';
import { paymentReducer } from '../reducers/payment.reducer';

export const paymentFeature = createFeature({
  name: 'payment',
  reducer: paymentReducer,
})
