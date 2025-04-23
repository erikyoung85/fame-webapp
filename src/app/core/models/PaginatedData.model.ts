import { AsyncData } from './AsyncData.model';

export interface PaginatedData<T> {
  pages: Partial<{ [pageId: number]: AsyncData<T[]> }>;
  totalCount: number;
  pageSize: number;
}
