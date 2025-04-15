import { createReducer, on } from '@ngrx/store';
import { wrapAsAsyncData } from 'src/app/core/models/AsyncData.model';
import { userActions } from '../actions/user.actions';
import { INITIAL_USER_STATE } from '../state/user.initial-state';
import { UserState } from '../state/user.state';

export const userReducer = createReducer(
  INITIAL_USER_STATE,
  on(
    userActions.loadSessionFailure,
    userActions.loginFailure,
    userActions.signupFailure,
    (state, action): UserState => {
      return {
        ...state,
        session: wrapAsAsyncData(state.session.data, false, action.message),
        userProfile: wrapAsAsyncData(
          state.userProfile.data,
          false,
          action.message
        ),
      };
    }
  ),

  on(userActions.loadSession, (state): UserState => {
    return {
      ...state,
      session: wrapAsAsyncData(undefined, true),
      userProfile: wrapAsAsyncData(undefined, true),
    };
  }),
  on(userActions.loadSessionSuccess, (state, action): UserState => {
    return {
      ...state,
      session: wrapAsAsyncData(action.session, false),
      userProfile: wrapAsAsyncData(action.userProfile, false),
    };
  }),

  on(userActions.loginWithPassword, (state): UserState => {
    return {
      ...state,
      session: wrapAsAsyncData(undefined, true),
      userProfile: wrapAsAsyncData(undefined, true),
    };
  }),
  on(userActions.loginSuccess, (state, action): UserState => {
    return {
      ...state,
      session: wrapAsAsyncData(action.session, false),
      userProfile: wrapAsAsyncData(action.userProfile, false),
    };
  }),

  on(userActions.signupWithPassword, (state): UserState => {
    return {
      ...state,
      session: wrapAsAsyncData(undefined, true),
      userProfile: wrapAsAsyncData(undefined, true),
    };
  }),
  on(userActions.signupSuccess, (state, action): UserState => {
    return {
      ...state,
      session: wrapAsAsyncData(action.session, false),
      userProfile: wrapAsAsyncData(action.userProfile, false),
    };
  }),

  on(userActions.updateUserProfile, (state): UserState => {
    return {
      ...state,
      userProfile: wrapAsAsyncData(state.userProfile.data, true),
    };
  }),
  on(userActions.updateUserProfileSuccess, (state, action): UserState => {
    return {
      ...state,
      userProfile: wrapAsAsyncData(action.userProfile, false),
    };
  }),
  on(userActions.updateUserProfileFailure, (state, action): UserState => {
    return {
      ...state,
      userProfile: wrapAsAsyncData(
        state.userProfile.data,
        false,
        action.message
      ),
    };
  })
);
