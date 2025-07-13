import { inject, Injectable } from '@angular/core';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { from, map, Observable } from 'rxjs';
import { PageType } from '../../enums/PageType.enum';
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
    'id, avatar_url, first_name, last_name, favorite_team_id, is_athlete, is_team_manager, profiles_admin(is_admin)';
  getUserProfile(
    userId: string
  ): Observable<PostgrestSingleResponse<UserProfileResponseDtoV1>> {
    const response = from(
      this.supabaseService.client
        .from('profiles')
        .select(this.profileSelect)
        .eq('id', userId)
        .single()
    );

    return response;
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
          .select(
            'athletes(id, first_name, last_name, avatar_url, raffles(id, title, description))'
          )
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

        const response: ManagedPagesResponseDtoV1 = {
          athletes: athletesRes.data.map((item) => ({
            type: PageType.Athlete,
            id: item.athletes.id,
            title: `${item.athletes.first_name} ${item.athletes.last_name}`,
            description: undefined,
            avatarUrl: item.athletes.avatar_url ?? undefined,
          })),
          teams: teamsRes.data.map((item) => ({
            type: PageType.Team,
            id: item.teams.id,
            title: item.teams.schools.name,
            description: undefined,
            avatarUrl: item.teams.schools.logo_url ?? undefined,
          })),
          raffles: athletesRes.data.flatMap((item) =>
            item.athletes.raffles.map((raffle) => ({
              type: PageType.Raffle,
              id: raffle.id,
              title: raffle.title,
              description: raffle.description ?? undefined,
              avatarUrl: undefined,
            }))
          ),
        };
        return response;
      })
    );

    return response;
  }
}
