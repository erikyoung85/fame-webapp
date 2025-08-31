import { createFeature } from '@ngrx/store';
import { pushNotificationsReducer } from '../reducers/push-notifications.reducer';

export const pushNotificationsFeature = createFeature({
  name: 'push-notifications',
  reducer: pushNotificationsReducer,
});
