import { NavigationOptions } from '@angular/core/navigation_types.d-fAxd92YV';
import { createActionGroup, props } from '@ngrx/store';

export const RouterActions = createActionGroup({
  source: 'Router',
  events: {
    'Route in current tab': props<{
      url: string | any[];
      options?: NavigationOptions;
      direction?: 'forward' | 'back';
    }>(),
  },
});
