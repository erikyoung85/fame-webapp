import { AsyncData } from 'src/app/core/async-data';

export interface PaginatedData<T> {
  pages: Partial<{ [pageId: number]: AsyncData<T[]> }>;
  totalCount: number;
  pageSize: number;
}
