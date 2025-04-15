import { RouterState } from './router/state/router.state';

export enum RootStateKey {
  ROUTER = 'router',
}

export type RootState = {
  [RootStateKey.ROUTER]: RouterState;
};
