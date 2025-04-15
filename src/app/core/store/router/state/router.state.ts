import { Params } from '@angular/router';
import { RouterReducerState } from '@ngrx/router-store';

export interface RouterUrlState {
  params: Params;
  previousUrl: string;
  queryParams: Params;
  state: {
    [key: string]: any; // eslint-disable-line  @typescript-eslint/no-explicit-any
  };
  url: string;
}

export type RouterState = RouterReducerState<RouterUrlState>;
