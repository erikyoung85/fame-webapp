import { createReducer, on } from '@ngrx/store';
import { AsyncDataStatus, wrapAsAsyncData } from 'src/app/core/async-data';
import { stripeActions } from '../actions/stripe.actions';
import { INITIAL_STRIPE_STATE } from '../state/stripe.initial-state';
import { StripeState } from '../state/stripe.state';

export const stripeReducer = createReducer(
  INITIAL_STRIPE_STATE,
  on(stripeActions.loadCustomerForUser, (state): StripeState => {
    return {
      ...state,
      customer: wrapAsAsyncData(undefined, AsyncDataStatus.Loading),
    };
  }),
  on(stripeActions.loadCustomerForUserSuccess, (state, action): StripeState => {
    return {
      ...state,
      customer: wrapAsAsyncData(action.customer, AsyncDataStatus.Success),
    };
  }),
  on(stripeActions.loadCustomerForUserFailure, (state, action): StripeState => {
    return {
      ...state,
      customer: wrapAsAsyncData(
        undefined,
        AsyncDataStatus.Error,
        action.message
      ),
    };
  })
);
