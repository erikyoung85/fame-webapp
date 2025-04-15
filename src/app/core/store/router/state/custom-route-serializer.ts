import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Params,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';
import { RouterUrlState } from './router.state';

@Injectable()
export class CustomRouteSerializer
  implements RouterStateSerializer<RouterUrlState>
{
  constructor(private router: Router) {}

  serialize(routerState: RouterStateSnapshot): RouterUrlState {
    const url: string = routerState.url;
    const queryParams: Params = routerState.root.queryParams;

    let route: ActivatedRouteSnapshot = routerState.root;
    while (route.firstChild !== null) {
      route = route.firstChild;
    }
    const params: Params = route.params;

    const state: {
      [key: string]: any; // eslint-disable-line  @typescript-eslint/no-explicit-any
    } = this.router.getCurrentNavigation()?.extras?.state ?? {};

    const previousUrl: string =
      this.router
        .getCurrentNavigation()
        ?.previousNavigation?.finalUrl?.toString() ?? '/';

    return { url, params, queryParams, state, previousUrl };
  }
}
