import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { SearchItem } from 'src/app/core/models/SearchItem.model';

export const searchActions = createActionGroup({
  source: 'Search',
  events: {
    'Clear Global Search': emptyProps(),

    'Fetch Global Search': props<{
      searchQuery: string;
      paging: {
        page: number;
        size: number;
      };
      purgeData?: boolean;
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
