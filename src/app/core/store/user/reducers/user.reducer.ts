import { createReducer, on } from '@ngrx/store';
import { AsyncDataStatus, wrapAsAsyncData } from 'src/app/core/async-data';
import { userActions } from '../actions/user.actions';
import { INITIAL_USER_STATE } from '../state/user.initial-state';
import { UserState } from '../state/user.state';

export const userReducer = createReducer(
  INITIAL_USER_STATE,

  on(userActions.loadSession, (state): UserState => {
    return {
      ...state,
      session: wrapAsAsyncData(state.session.data, AsyncDataStatus.Loading),
    };
  }),
  on(userActions.loadSessionSuccess, (state, action): UserState => {
    return {
      ...state,
      session: wrapAsAsyncData(action.session, AsyncDataStatus.Success),
    };
  }),
  on(userActions.loadSessionFailure, (state, action): UserState => {
    return {
      ...state,
      session: wrapAsAsyncData(
        state.session.data,
        AsyncDataStatus.Error,
        action.message
      ),
    };
  }),

  on(userActions.loginWithPassword, (state): UserState => {
    return {
      ...state,
      session: wrapAsAsyncData(state.session.data, AsyncDataStatus.Loading),
    };
  }),
  on(userActions.loginSuccess, (state, action): UserState => {
    return {
      ...state,
      session: wrapAsAsyncData(action.session, AsyncDataStatus.Success),
    };
  }),
  on(userActions.loginFailure, (state, action): UserState => {
    return {
      ...state,
      session: wrapAsAsyncData(
        state.session.data,
        AsyncDataStatus.Error,
        action.message
      ),
    };
  }),

  on(userActions.getUserProfile, (state): UserState => {
    return {
      ...state,
      userProfile: wrapAsAsyncData(undefined, AsyncDataStatus.Loading),
    };
  }),
  on(userActions.getUserProfileSuccess, (state, action): UserState => {
    return {
      ...state,
      userProfile: wrapAsAsyncData(action.userProfile, AsyncDataStatus.Success),
    };
  }),
  on(userActions.getUserProfileFailure, (state, action): UserState => {
    return {
      ...state,
      userProfile: wrapAsAsyncData(
        undefined,
        AsyncDataStatus.Error,
        action.message
      ),
    };
  }),
  on(userActions.clearUserProfile, (state): UserState => {
    return {
      ...state,
      userProfile: wrapAsAsyncData(undefined, AsyncDataStatus.Success),
    };
  }),

  on(
    userActions.updateUserProfile,
    userActions.patchUserProfile,
    (state): UserState => {
      return {
        ...state,
        userProfile: wrapAsAsyncData(
          state.userProfile.data,
          AsyncDataStatus.Loading
        ),
      };
    }
  ),
  on(
    userActions.updateUserProfileSuccess,
    userActions.patchUserProfileSuccess,
    (state, action): UserState => {
      return {
        ...state,
        userProfile: wrapAsAsyncData(
          action.userProfile,
          AsyncDataStatus.Success
        ),
      };
    }
  ),
  on(
    userActions.updateUserProfileFailure,
    userActions.patchUserProfileFailure,
    (state, action): UserState => {
      return {
        ...state,
        userProfile: wrapAsAsyncData(
          state.userProfile.data,
          AsyncDataStatus.Error,
          action.message
        ),
      };
    }
  ),

  on(userActions.logout, (state): UserState => {
    return {
      ...state,
      session: wrapAsAsyncData(state.session.data, AsyncDataStatus.Loading),
    };
  }),
  on(userActions.logoutSuccess, (state): UserState => {
    return {
      ...state,
      session: wrapAsAsyncData(undefined, AsyncDataStatus.Success),
    };
  }),
  on(userActions.logoutFailure, (state, action): UserState => {
    return {
      ...state,
      session: wrapAsAsyncData(
        state.session.data,
        AsyncDataStatus.Error,
        action.message
      ),
    };
  }),

  on(userActions.fetchUserEnteredRaffles, (state): UserState => {
    return {
      ...state,
      enteredRaffles: wrapAsAsyncData([], AsyncDataStatus.Loading),
    };
  }),
  on(userActions.fetchUserEnteredRafflesSuccess, (state, action): UserState => {
    return {
      ...state,
      enteredRaffles: wrapAsAsyncData(action.raffles, AsyncDataStatus.Success),
    };
  }),
  on(userActions.fetchUserEnteredRafflesFailure, (state, action): UserState => {
    return {
      ...state,
      enteredRaffles: wrapAsAsyncData(
        [],
        AsyncDataStatus.Error,
        action.message
      ),
    };
  }),

  on(userActions.fetchUserManagedPages, (state): UserState => {
    return {
      ...state,
      managedPages: wrapAsAsyncData(
        {
          athletes: [],
          teams: [],
          raffles: [],
        },
        AsyncDataStatus.Loading
      ),
    };
  }),
  on(userActions.fetchUserManagedPagesSuccess, (state, action): UserState => {
    return {
      ...state,
      managedPages: wrapAsAsyncData(
        {
          athletes: action.athletes,
          teams: action.teams,
          raffles: action.raffles,
        },
        AsyncDataStatus.Success
      ),
    };
  }),
  on(userActions.fetchUserManagedPagesFailure, (state, action): UserState => {
    return {
      ...state,
      managedPages: wrapAsAsyncData(
        {
          athletes: [],
          teams: [],
          raffles: [],
        },
        AsyncDataStatus.Error,
        action.message
      ),
    };
  })
);
