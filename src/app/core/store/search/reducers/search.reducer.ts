import { createReducer, on } from '@ngrx/store';
import { wrapAsAsyncData } from 'src/app/core/models/AsyncData.model';
import { searchActions } from '../actions/search.actions';
import { INITIAL_SEARCH_STATE } from '../state/search.initial-state';
import { SearchState } from '../state/search.state';

export const searchReducer = createReducer(
  INITIAL_SEARCH_STATE,
  on(searchActions.clearGlobalSearch, (): SearchState => {
    return INITIAL_SEARCH_STATE;
  }),
  on(searchActions.fetchGlobalSearch, (state, action): SearchState => {
    return {
      ...state,
      searchQuery: action.searchQuery,
      searchItems: {
        ...state.searchItems,
        pages: {
          ...(action.purgeData === true ? {} : state.searchItems.pages),
          [action.paging.page]: wrapAsAsyncData([], true),
        },
        totalCount: 0,
      },
    };
  }),
  on(searchActions.fetchGlobalSearchSuccess, (state, action): SearchState => {
    return {
      ...state,
      searchItems: {
        ...state.searchItems,
        pages: {
          ...state.searchItems.pages,
          [action.paging.page]: wrapAsAsyncData(action.searchItems, false),
        },
        totalCount: action.paging.totalCount,
      },
    };
  }),
  on(searchActions.fetchGlobalSearchFailure, (state, action): SearchState => {
    return {
      ...state,
      searchItems: {
        ...state.searchItems,
        pages: {
          ...state.searchItems.pages,
          [action.paging.page]: wrapAsAsyncData([], false, action.message),
        },
      },
    };
  })
);
