import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const pushNotificationsActions = createActionGroup({
  source: 'Push Notifications',
  events: {
    'Save FCM Token': props<{ token: string }>(),
    'Save FCM Token Success': emptyProps(),
    'Save FCM Token Failure': props<{ message: string }>(),
  },
});
