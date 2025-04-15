import { RouterState } from './router.state';

export const INITIAL_ROUTER_STATE: RouterState = {
  navigationId: 0,
  state: {
    params: {},
    previousUrl: '/',
    queryParams: {},
    state: {},
    url: '/',
  },
};
