import { inject, Injectable } from '@angular/core';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { from, Observable } from 'rxjs';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateRaffleRequestDtoV1 } from './dtos/requests/create-raffle.request.dto.v1';
import { RaffleResponseDtoV1 } from './dtos/responses/raffle.response.dto.v1';

@Injectable({
  providedIn: 'root',
})
export class RaffleService {
  private readonly supabaseService = inject(SupabaseService);

  private readonly raffleSelect =
    'id, title, description, start_date, end_date, athletes(id, first_name, last_name, roster_entries(teams(id, name, sports(id, name))))';
  getRafflesForAthlete(
    athleteId: number
  ): Observable<PostgrestSingleResponse<RaffleResponseDtoV1[]>> {
    const response = from(
      this.supabaseService.client
        .from('raffles')
        .select(this.raffleSelect)
        .eq('athletes_id', athleteId)
    );

    return response;
  }

  createRaffle(
    request: CreateRaffleRequestDtoV1
  ): Observable<PostgrestSingleResponse<RaffleResponseDtoV1>> {
    const response = from(
      this.supabaseService.client
        .from('raffles')
        .insert(request)
        .select(this.raffleSelect)
        .single()
    );

    return response;
  }
}
