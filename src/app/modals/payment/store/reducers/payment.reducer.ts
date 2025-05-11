import { createReducer, on } from '@ngrx/store';
import {
  AsyncDataStatus,
  wrapAsAsyncData,
} from 'src/app/core/models/AsyncData.model';
import { paymentActions } from '../actions/payment.actions';
import { INITIAL_PAYMENT_STATE } from '../state/payment.initial-state';
import { PaymentState } from '../state/payment.state';

export const paymentReducer = createReducer(
  INITIAL_PAYMENT_STATE,
  on(paymentActions.resetPaymentState, (): PaymentState => {
    return INITIAL_PAYMENT_STATE;
  }),

  on(paymentActions.setPaymentTab, (state, action): PaymentState => {
    return {
      ...state,
      currentTab: action.tab,
    };
  }),

  on(paymentActions.createPaymentIntent, (state): PaymentState => {
    return {
      ...state,
      paymentIntent: wrapAsAsyncData(undefined, AsyncDataStatus.Loading),
    };
  }),
  on(paymentActions.updatePaymentIntent, (state): PaymentState => {
    return {
      ...state,
      paymentIntent: wrapAsAsyncData(
        state.paymentIntent.data,
        AsyncDataStatus.Loading
      ),
    };
  }),
  on(
    paymentActions.createPaymentIntentSuccess,
    paymentActions.updatePaymentIntentSuccess,
    (state, action): PaymentState => {
      return {
        ...state,
        paymentIntent: wrapAsAsyncData(
          action.paymentIntent,
          AsyncDataStatus.Success
        ),
      };
    }
  ),
  on(
    paymentActions.createPaymentIntentFailure,
    paymentActions.updatePaymentIntentFailure,
    (state, action): PaymentState => {
      return {
        ...state,
        paymentIntent: wrapAsAsyncData(
          undefined,
          AsyncDataStatus.Error,
          action.message
        ),
      };
    }
  ),

  on(paymentActions.collectPayment, (state): PaymentState => {
    return {
      ...state,
      paymentStatus: undefined,
    };
  }),
  on(paymentActions.collectPaymentSuccess, (state, action): PaymentState => {
    return {
      ...state,
      paymentStatus: action.paymentStatus,
    };
  }),
  on(paymentActions.collectPaymentFailure, (state, action): PaymentState => {
    return {
      ...state,
      paymentStatus: undefined,
    };
  })
);
