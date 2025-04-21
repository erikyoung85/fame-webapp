import { inject, Injectable } from '@angular/core';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { from, Observable } from 'rxjs';
import { SupabaseService } from '../supabase/supabase.service';
import { TeamResponseDtoV1 } from './dtos/responses/team.response.dto.v1';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  private readonly supabaseService = inject(SupabaseService);

  getAllTeams(): Observable<PostgrestSingleResponse<TeamResponseDtoV1[]>> {
    return from(
      this.supabaseService.client
        .from('teams')
        .select(
          'id, season_year, name, schools(id, name, abbreviation, city, state), sports(id, name, gender)'
        )
    );
  }
}
