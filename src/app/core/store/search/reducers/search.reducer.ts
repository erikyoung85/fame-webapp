import { createReducer, on } from '@ngrx/store';
import { AsyncDataStatus, wrapAsAsyncData } from 'src/app/core/async-data';
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
          [action.paging.page]: wrapAsAsyncData([], AsyncDataStatus.Loading),
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
          [action.paging.page]: wrapAsAsyncData(
            action.searchItems,
            AsyncDataStatus.Success
          ),
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
          [action.paging.page]: wrapAsAsyncData(
            [],
            AsyncDataStatus.Error,
            action.message
          ),
        },
      },
    };
  }),

  on(searchActions.fetchTrendingRaffles, (state): SearchState => {
    return {
      ...state,
      trendingRaffles: wrapAsAsyncData([], AsyncDataStatus.Loading),
    };
  }),
  on(
    searchActions.fetchTrendingRafflesSuccess,
    (state, action): SearchState => {
      return {
        ...state,
        trendingRaffles: wrapAsAsyncData(
          action.raffles,
          AsyncDataStatus.Success
        ),
      };
    }
  ),
  on(
    searchActions.fetchTrendingRafflesFailure,
    (state, action): SearchState => {
      return {
        ...state,
        trendingRaffles: wrapAsAsyncData(
          [],
          AsyncDataStatus.Error,
          action.message
        ),
      };
    }
  )
);
