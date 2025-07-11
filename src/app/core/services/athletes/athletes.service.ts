import { inject, Injectable } from '@angular/core';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { from, Observable } from 'rxjs';
import { raffleSelectStr } from '../raffle/dtos/responses/raffle.response.dto.v1';
import { SupabaseService } from '../supabase/supabase.service';
import { UpdateAthleteRequestDtoV1 } from './dtos/requests/updateAthlete.request.dto.v1';
import { AthleteDetailResponseDtoV1 } from './dtos/responses/athleteDetail.response.dto.v1';
import { AthleteResponseDtoV1 } from './dtos/responses/athletes.response.dto.v1';

@Injectable({
  providedIn: 'root',
})
export class AthletesService {
  private readonly supabaseService = inject(SupabaseService);

  getAllAthletes(): Observable<
    PostgrestSingleResponse<AthleteResponseDtoV1[]>
  > {
    const response = from(
      this.supabaseService.client
        .from('athletes')
        .select(
          'id, avatar_url, first_name, last_name, date_of_birth, gender, grade, schools(id, name, abbreviation), roster_entries(id, jersey_number, position, teams(id, name, sports(id, name)))'
        )
    );

    return response;
  }

  private readonly athleteDetailSelect = `id, avatar_url, first_name, last_name, date_of_birth, gender, grade, hometown, raffles(${raffleSelectStr}), schools(id, name, abbreviation), roster_entries(id, jersey_number, position, teams(id, name, banner_url, sports(id, name)))`;
  getAthleteDetail(
    athleteId: number
  ): Observable<PostgrestSingleResponse<AthleteDetailResponseDtoV1>> {
    const response = from(
      this.supabaseService.client
        .from('athletes')
        .select(this.athleteDetailSelect)
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
        .select(this.athleteDetailSelect)
        .single()
    );

    return response;
  }
}
