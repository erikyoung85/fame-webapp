import { inject, Injectable } from '@angular/core';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { from, Observable } from 'rxjs';
import { SupabaseService } from '../supabase/supabase.service';
import { SearchItemResponseDtoV1 } from './dtos/responses/search.response.dto.v1';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private readonly supabaseService = inject(SupabaseService);

  search(
    searchStr: string
  ): Observable<PostgrestSingleResponse<SearchItemResponseDtoV1[]>> {
    return from(
      this.supabaseService.client.rpc('search_all_entities_v2', {
        query: searchStr,
        page_limit: 10,
        page_offset: 0, // 0 = first page, 10 = second page, etc.
      })
    );
  }
}
