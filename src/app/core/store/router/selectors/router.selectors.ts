import { convertToParamMap } from '@angular/router';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RootStateKey } from '../../root.state';
import { RouterState } from '../state/router.state';

export const selectRouterState = createFeatureSelector<RouterState>(
  RootStateKey.ROUTER
);

export const selectRouterUrlState = createSelector(
  selectRouterState,
  (state) => state.state
);

export const selectUrl = createSelector(
  selectRouterUrlState,
  (state) => state.url
);

export const selectUrlWithoutQueryParams = createSelector(
  selectUrl,
  (url) => url.split('?')[0]
);

export const selectPreviousUrl = createSelector(
  selectRouterUrlState,
  (state) => state.previousUrl
);

export const selectParamMap = createSelector(selectRouterUrlState, (state) =>
  convertToParamMap(state.params)
);

export const selectQueryParamMap = createSelector(
  selectRouterUrlState,
  (state) => convertToParamMap(state.queryParams)
);
