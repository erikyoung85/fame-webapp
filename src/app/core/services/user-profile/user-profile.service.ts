import { inject, Injectable } from '@angular/core';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { from, Observable } from 'rxjs';
import { SupabaseService } from '../supabase/supabase.service';
import { PatchUserProfileRequestDtoV1 } from './dtos/requests/patch-user-profile.request.dto.v1';
import { UserProfileResponseDtoV1 } from './dtos/responses/user-profile.response.dto.v1';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private readonly supabaseService = inject(SupabaseService);

  getUserProfile(
    userId: string
  ): Observable<PostgrestSingleResponse<UserProfileResponseDtoV1>> {
    return from(
      this.supabaseService.client
        .from('profiles')
        .select(
          'id, first_name, last_name, favorite_team_id, stripe_customer_id'
        )
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
        .select(
          'id, first_name, last_name, favorite_team_id, stripe_customer_id'
        )
        .single()
    );
  }
}
