import { inject, Injectable } from '@angular/core';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { from, Observable } from 'rxjs';
import { SupabaseService } from '../supabase/supabase.service';
import { UpdateAthleteRequestDtoV1 } from './dtos/requests/updateAthlete.request.dto.v1';
import {
  AthleteDetailResponseDtoV1,
  SELECT_ATHLETE_DETAIL_V1,
} from './dtos/responses/athleteDetail.response.dto.v1';
import {
  AthleteResponseDtoV1,
  SELECT_ATHLETE_V1,
} from './dtos/responses/athletes.response.dto.v1';

@Injectable({
  providedIn: 'root',
})
export class AthletesService {
  private readonly supabaseService = inject(SupabaseService);

  getAllAthletes(): Observable<
    PostgrestSingleResponse<AthleteResponseDtoV1[]>
  > {
    const response = from(
      this.supabaseService.client.from('athletes').select(SELECT_ATHLETE_V1)
    );

    return response;
  }

  getTrendingAthletes(): Observable<
    PostgrestSingleResponse<AthleteResponseDtoV1[]>
  > {
    const response = from(
      this.supabaseService.client
        .from('athletes')
        .select(SELECT_ATHLETE_V1)
        .limit(10)
    );

    return response;
  }

  getAthleteDetail(
    athleteId: number
  ): Observable<PostgrestSingleResponse<AthleteDetailResponseDtoV1>> {
    const response = from(
      this.supabaseService.client
        .from('athletes')
        .select(SELECT_ATHLETE_DETAIL_V1)
        .eq('id', athleteId)
        .single()
    );
    return response;
  }

  updateAthlete(
    request: UpdateAthleteRequestDtoV1
  ): Observable<PostgrestSingleResponse<AthleteDetailResponseDtoV1>> {
    const response = from(
      this.supabaseService.client
        .from('athletes')
        .update(request)
        .eq('id', request.id)
        .select(SELECT_ATHLETE_DETAIL_V1)
        .single()
    );

    return response;
  }
}
