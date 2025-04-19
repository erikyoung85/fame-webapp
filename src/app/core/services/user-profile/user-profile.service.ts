import { inject, Injectable } from '@angular/core';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { from, Observable } from 'rxjs';
import { SupabaseService } from '../supabase/supabase.service';
import { UpdateUserProfileRequestDtoV1 } from './dtos/requests/update-user-profile.request.dto.v1';
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
        .select('id, first_name, last_name')
        .eq('id', userId)
        .single()
    );
  }

  updateUserProfile(
    userId: string,
    request: UpdateUserProfileRequestDtoV1
  ): Observable<PostgrestSingleResponse<UserProfileResponseDtoV1>> {
    return from(
      this.supabaseService.client
        .from('profiles')
        .update(request)
        .eq('id', userId)
        .select('id, first_name, last_name')
        .single()
    );
  }
}
