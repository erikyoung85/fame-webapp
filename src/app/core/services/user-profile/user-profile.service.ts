import { inject, Injectable } from '@angular/core';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { from, map, Observable } from 'rxjs';
import { SupabaseService } from '../supabase/supabase.service';
import { PatchUserProfileRequestDtoV1 } from './dtos/requests/patch-user-profile.request.dto.v1';
import { ManagedPagesResponseDtoV1 } from './dtos/responses/managed-pages.response.dto.v1';
import { UserProfileResponseDtoV1 } from './dtos/responses/user-profile.response.dto.v1';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private readonly supabaseService = inject(SupabaseService);

  private readonly profileSelect =
    'id, avatar_url, first_name, last_name, favorite_team_id';
  getUserProfile(
    userId: string
  ): Observable<PostgrestSingleResponse<UserProfileResponseDtoV1>> {
    return from(
      this.supabaseService.client
        .from('profiles')
        .select(this.profileSelect)
        .eq('id', userId)
        .single()
    );
  }

  patchUserProfile(
    userId: string,
    request: PatchUserProfileRequestDtoV1
  ): Observable<PostgrestSingleResponse<UserProfileResponseDtoV1>> {
    return from(
      this.supabaseService.client
        .from('profiles')
        .update(request)
        .eq('id', userId)
        .select(this.profileSelect)
        .single()
    );
  }

  getManagedPages(
    userId: string
  ): Observable<ManagedPagesResponseDtoV1 | Error> {
    const response = from(
      Promise.all([
        this.supabaseService.client
          .from('profiles_x_athletes')
          .select('athletes(id, first_name, last_name, avatar_url)')
          .eq('profiles_id', userId),
        this.supabaseService.client
          .from('profiles_x_teams')
          .select('teams(id, schools(id, name, logo_url))')
          .eq('profiles_id', userId),
      ])
    ).pipe(
      map(([athletesRes, teamsRes]) => {
        if (athletesRes.error || teamsRes.error) {
          return new Error(
            athletesRes.error?.message ??
              teamsRes.error?.message ??
              'Error fetching managed pages'
          );
        }

        return {
          athletes: athletesRes.data?.map((item) => item.athletes),
          teams: teamsRes.data?.map((item) => ({
            id: item.teams.id,
            name: item.teams.schools.name,
            avatar_url: item.teams.schools.logo_url,
          })),
        };
      })
    );

    return response;
  }
}
