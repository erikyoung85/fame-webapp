import { SearchState } from './search.state';

export const INITIAL_SEARCH_STATE: SearchState = {
  searchQuery: '',
  searchItems: {
    pages: {},
    pageSize: 10,
    totalCount: 0,
  },
};
