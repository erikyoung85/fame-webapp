import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const pushNotificationsActions = createActionGroup({
  source: 'Push Notifications',
  events: {
    'Save Token': props<{ token: string; userId?: string | undefined }>(),
    'Save Token Success': emptyProps(),
    'Save Token Failure': props<{ message: string }>(),
  },
});
