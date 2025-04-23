import { createFeature, createSelector } from '@ngrx/store';
import { searchReducer } from '../reducers/search.reducer';

export const searchFeature = createFeature({
  name: 'search',
  reducer: searchReducer,
  extraSelectors: ({ selectSearchItems }) => ({
    selectAllSearchItems: createSelector(
      selectSearchItems,
      (searchItemsPaginated) => {
        return Object.values(searchItemsPaginated.pages)
          .map((page) => page?.data)
          .filter((page) => page !== undefined)
          .flat();
      }
    ),

    selectAnyPagesLoading: createSelector(
      selectSearchItems,
      (searchItemsPaginated) => {
        return Object.values(searchItemsPaginated.pages).some(
          (page) => page?.loading === true
        );
      }
    ),
  }),
});
