import { getRouterSelectors, RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppRoutes, TabRoutes } from 'src/app/app.routes';
import { RootStateKey } from '../../root.state';

export const selectRouter = createFeatureSelector<RouterReducerState>(
  RootStateKey.ROUTER
);

export const {
  selectCurrentRoute, // select the current route
  selectFragment, // select the current route fragment
  selectQueryParams, // select the current route query params
  selectQueryParam, // factory function to select a query param
  selectRouteParams, // select the current route params
  selectRouteParam, // factory function to select a route param
  selectRouteData, // select the current route data
  selectRouteDataParam, // factory function to select a route data param
  selectUrl, // select the current url
  selectTitle, // select the title if available
} = getRouterSelectors();

export const selectPathSegments = createSelector(selectUrl, (url) => {
  const path = url?.split('?')?.[0];
  const pathSegments =
    path?.split('/')?.filter((segment) => segment !== '') ?? [];
  return pathSegments;
});

export const selectCurrentTabRoute = createSelector(
  selectPathSegments,
  (pathSegments) => {
    const isInTabs = pathSegments[0] === AppRoutes.Tabs;
    if (!isInTabs) return undefined;

    const currentTabRoute = Object.values(TabRoutes).find(
      (tabRoute) => tabRoute === pathSegments[1]
    );

    return currentTabRoute;
  }
);
