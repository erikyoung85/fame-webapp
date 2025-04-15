import { RouterReducerState } from '@ngrx/router-store';

export enum RootStateKey {
  ROUTER = 'router',
}

export type RootState = {
  [RootStateKey.ROUTER]: RouterReducerState<any>;
};
