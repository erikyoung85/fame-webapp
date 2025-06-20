import { createActionGroup, props } from '@ngrx/store';
import { TabRoutes } from 'src/app/app.routes';

export const RouterActions = createActionGroup({
  source: 'Router',
  events: {
    'Select tab': props<{
      tab: TabRoutes;
    }>(),

    'Route in current tab': props<{
      url: string | any[];
      direction?: 'forward' | 'back';
      animated?: boolean;
      replaceUrl?: boolean;
    }>(),
  },
});
