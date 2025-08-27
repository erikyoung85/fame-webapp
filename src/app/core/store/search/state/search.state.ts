import { PaginatedData } from 'src/app/core/models/PaginatedData.model';
import { SearchItem } from 'src/app/core/models/SearchItem.model';

export interface SearchState {
  searchQuery: string;
  searchItems: PaginatedData<SearchItem>;
}
