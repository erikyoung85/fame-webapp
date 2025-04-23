import { createActionGroup, props } from '@ngrx/store';
import { SearchItem } from 'src/app/core/models/SearchItem.model';

export const searchActions = createActionGroup({
  source: 'Search',
  events: {
    'Fetch Global Search': props<{
      searchQuery: string;
      paging: {
        page: number;
        size: number;
      };
    }>(),
    'Fetch Global Search Success': props<{
      searchItems: SearchItem[];
      paging: {
        page: number;
        size: number;
        totalCount: number;
      };
    }>(),
    'Fetch Global Search Failure': props<{
      message?: string;
      paging: {
        page: number;
        size: number;
      };
    }>(),
  },
});
