import { inject, Injectable } from '@angular/core';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { from, Observable } from 'rxjs';
import { SupabaseService } from '../supabase/supabase.service';
import { UpdateTeamRequestDtoV1 } from './dtos/requests/update-team.request.dto.v1';
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
          'id, season_year, name, logo_url, schools(id, name, abbreviation, city, state, logo_url), sports(id, name, gender)'
        )
    );
  }

  private readonly teamDetailsSelect =
    'id, season_year, name, banner_url, logo_url, schools(id, name, abbreviation, city, state, logo_url), sports(id, name, gender), roster_entries(id, position, jersey_number, athletes(id, avatar_url, first_name, last_name, gender, grade))';

  getTeamDetails(
    teamId: number
  ): Observable<PostgrestSingleResponse<TeamDetailResponseDtoV1>> {
    return from(
      this.supabaseService.client
        .from('teams')
        .select(this.teamDetailsSelect)
        .eq('id', teamId)
        .single()
    );
  }

  updateTeam(
    request: UpdateTeamRequestDtoV1
  ): Observable<PostgrestSingleResponse<TeamDetailResponseDtoV1>> {
    const response = from(
      this.supabaseService.client
        .from('teams')
        .update(request)
        .eq('id', request.id)
        .select(this.teamDetailsSelect)
        .single()
    );

    return response;
  }
}
