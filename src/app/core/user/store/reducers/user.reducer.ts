import { createReducer, on } from '@ngrx/store';
import { wrapAsAsyncData } from 'src/app/core/models/AsyncData.model';
import { userActions } from '../actions/user.actions';
import { INITIAL_USER_STATE } from '../state/user.initial-state';
import { UserState } from '../state/user.state';

export const userReducer = createReducer(
  INITIAL_USER_STATE,
  on(userActions.loginWithPassword, (state): UserState => {
    return {
      ...state,
      session: wrapAsAsyncData(undefined, true),
    };
  }),
  on(userActions.loginSuccess, (state, action): UserState => {
    return {
      ...state,
      session: wrapAsAsyncData(action.session, false),
    };
  }),
  on(userActions.loginFailure, (state, action): UserState => {
    return {
      ...state,
      session: wrapAsAsyncData(state.session.data, false, action.message),
    };
  })
);
