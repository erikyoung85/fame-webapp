import { inject, Injectable } from '@angular/core';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { from, Observable } from 'rxjs';
import { SupabaseService } from '../supabase/supabase.service';
import { TeamDetailResponseDtoV1 } from './dtos/responses/team-detail.response.dto.v1';
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
          'id, season_year, name, schools(id, name, abbreviation, city, state, logo_url), sports(id, name, gender)'
        )
    );
  }

  getTeamDetails(
    teamId: number
  ): Observable<PostgrestSingleResponse<TeamDetailResponseDtoV1>> {
    return from(
      this.supabaseService.client
        .from('teams')
        .select(
          'id, season_year, name, banner_url, schools(id, name, abbreviation, city, state, logo_url), sports(id, name, gender), roster_entries(id, position, jersey_number, athletes(id, first_name, last_name, gender, grade))'
        )
        .eq('id', teamId)
        .single()
    );
  }
}
