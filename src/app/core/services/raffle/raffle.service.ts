import { inject, Injectable } from '@angular/core';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { from, Observable } from 'rxjs';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateRaffleRequestDtoV1 } from './dtos/requests/create-raffle.request.dto.v1';
import {
  RaffleResponseDtoV1,
  raffleSelectStr,
} from './dtos/responses/raffle.response.dto.v1';

@Injectable({
  providedIn: 'root',
})
export class RaffleService {
  private readonly supabaseService = inject(SupabaseService);

  getRaffle(
    raffleId: number
  ): Observable<PostgrestSingleResponse<RaffleResponseDtoV1>> {
    const response = from(
      this.supabaseService.client
        .from('raffles')
        .select(raffleSelectStr)
        .eq('id', raffleId)
        .single()
    );

    return response;
  }

  getRafflesForAthlete(
    athleteId: number
  ): Observable<PostgrestSingleResponse<RaffleResponseDtoV1[]>> {
    const response = from(
      this.supabaseService.client
        .from('raffles')
        .select(raffleSelectStr)
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
        .select(raffleSelectStr)
        .single()
    );

    return response;
  }
}
