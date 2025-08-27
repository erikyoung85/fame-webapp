import { inject, Injectable } from '@angular/core';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { from, Observable } from 'rxjs';
import { SupabaseService } from '../supabase/supabase.service';
import { UpdateTeamRequestDtoV1 } from './dtos/requests/update-team.request.dto.v1';
import {
  SELECT_TEAM_DETAIL_V1,
  TeamDetailResponseDtoV1,
} from './dtos/responses/team-detail.response.dto.v1';
import {
  SELECT_TEAM_V1,
  TeamResponseDtoV1,
} from './dtos/responses/team.response.dto.v1';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  private readonly supabaseService = inject(SupabaseService);

  getAllTeams(): Observable<PostgrestSingleResponse<TeamResponseDtoV1[]>> {
    return from(
      this.supabaseService.client.from('teams').select(SELECT_TEAM_V1)
    );
  }

  getTrendingTeams(): Observable<PostgrestSingleResponse<TeamResponseDtoV1[]>> {
    const response = from(
      this.supabaseService.client.from('teams').select(SELECT_TEAM_V1).limit(10)
    );

    return response;
  }

  getTeamDetails(
    teamId: number
  ): Observable<PostgrestSingleResponse<TeamDetailResponseDtoV1>> {
    return from(
      this.supabaseService.client
        .from('teams')
        .select(SELECT_TEAM_DETAIL_V1)
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
        .select(SELECT_TEAM_DETAIL_V1)
        .single()
    );

    return response;
  }
}
