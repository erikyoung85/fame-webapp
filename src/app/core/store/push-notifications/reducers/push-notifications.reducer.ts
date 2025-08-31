import { createReducer, on } from '@ngrx/store';
import { pushNotificationsActions } from '../actions/push-notifications.actions';
import { INITIAL_PUSH_NOTIFICATIONS_STATE } from '../state/push-notifications.initial-state';
import { PushNotificationsState } from '../state/push-notifications.state';

export const pushNotificationsReducer = createReducer(
  INITIAL_PUSH_NOTIFICATIONS_STATE,
  on(
    pushNotificationsActions.saveToken,
    (state, action): PushNotificationsState => {
      return {
        ...state,
        token: action.token,
      };
    }
  )
);
