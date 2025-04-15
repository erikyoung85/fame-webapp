import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import { RootState, RootStateKey } from './root.state';

export const rootReducer: ActionReducerMap<RootState> = {
  [RootStateKey.ROUTER]: routerReducer,
};
