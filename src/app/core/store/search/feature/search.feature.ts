import { createFeature, createSelector } from '@ngrx/store';
import { AsyncDataStatus } from 'src/app/core/models/AsyncData.model';
import { searchReducer } from '../reducers/search.reducer';

export const searchFeature = createFeature({
  name: 'search',
  reducer: searchReducer,
  extraSelectors: ({ selectSearchItems }) => ({
    selectAllSearchItems: createSelector(
      selectSearchItems,
      (searchItemsPaginated) => {
        return Object.values(searchItemsPaginated.pages)
          .map((pageAsync) => pageAsync?.data)
          .filter((page) => page !== undefined)
          .flat();
      }
    ),

    selectAnyPagesLoading: createSelector(
      selectSearchItems,
      (searchItemsPaginated) => {
        return Object.values(searchItemsPaginated.pages).some(
          (page) => page?.status === AsyncDataStatus.Loading
        );
      }
    ),
  }),
});
