import { inject, Injectable } from '@angular/core';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { from, Observable } from 'rxjs';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateRaffleRequestDtoV1 } from './dtos/requests/create-raffle.request.dto.v1';
import { UpdateRaffleRequestDtoV1 } from './dtos/requests/update-raffle.request.dto.v1';
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
    raffleId: string
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

  getTrendingRaffles(): Observable<
    PostgrestSingleResponse<RaffleResponseDtoV1[]>
  > {
    const response = from(
      this.supabaseService.client
        .from('raffles')
        .select(raffleSelectStr)
        .lt('start_date', new Date().toISOString())
        .gt('end_date', new Date().toISOString())
        .order('end_date', { ascending: false })
        .limit(10)
    );

    return response;
  }

  getUserEnteredRaffles(
    userProfileId: string
  ): Observable<PostgrestSingleResponse<RaffleResponseDtoV1[]>> {
    const response = from(
      this.supabaseService.client
        .from('raffles')
        .select(`${raffleSelectStr}, raffle_ticket_purchases!inner()`)
        .eq('raffle_ticket_purchases.profile_id', userProfileId)
    );

    return response;
  }

  getRafflesForAthlete(
    athleteId: number,
    activeOnly = true
  ): Observable<PostgrestSingleResponse<RaffleResponseDtoV1[]>> {
    const request = this.supabaseService.client
      .from('raffles')
      .select(raffleSelectStr)
      .eq('athletes_id', athleteId);

    if (activeOnly) {
      request.lt('start_date', new Date().toISOString());
      request.gt('end_date', new Date().toISOString());
    }

    const response = from(request);

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

  updateRaffle(
    request: UpdateRaffleRequestDtoV1
  ): Observable<PostgrestSingleResponse<RaffleResponseDtoV1>> {
    const response = from(
      this.supabaseService.client
        .from('raffles')
        .update(request)
        .eq('id', request.id)
        .select(raffleSelectStr)
        .single()
    );

    return response;
  }
}
