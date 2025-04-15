import { Params } from '@angular/router';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { RouterNavigatePayload } from '../state/router-navigate-payload';

export const RouterActions = createActionGroup({
  source: 'Router',
  events: {
    'Navigate command': props<RouterNavigatePayload>(),
    'Navigate relative command': props<RouterNavigatePayload>(),
    'Update query params command': props<{ queryParams: Params }>(),
    'Navigate back command': emptyProps(),
  },
});
