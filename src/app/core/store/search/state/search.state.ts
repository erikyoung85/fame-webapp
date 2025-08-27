import { AsyncData } from 'src/app/core/async-data';
import { PaginatedData } from 'src/app/core/models/PaginatedData.model';
import { Raffle } from 'src/app/core/models/Raffle.model';
import { SearchItem } from 'src/app/core/models/SearchItem.model';

export interface SearchState {
  searchQuery: string;
  searchItems: PaginatedData<SearchItem>;

  trendingRaffles: AsyncData<Raffle[]>;
}
