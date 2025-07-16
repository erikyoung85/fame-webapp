import { inject, Injectable } from '@angular/core';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { from, Observable } from 'rxjs';
import { SupabaseService } from '../supabase/supabase.service';
import {
  AthleteRaffleSummaryResponseDtoV1,
  athleteRaffleSummarySelectStr,
} from './dtos/responses/athlete-raffle-summary.response.dto.v1';
import {
  ProfileAthleteRaffleSummaryResponseDtoV1,
  profileAthleteRaffleSummarySelectStr,
} from './dtos/responses/athlete-raffle-summary.response.dto.v1 copy';
import {
  TransactionSummaryResponseDtoV1,
  transactionSummarySelectStr,
} from './dtos/responses/transaction-summary.response.dto.v1';
import {
  TransactionResponseDtoV1,
  transactionSelectStr,
} from './dtos/responses/transaction.response.dto.v1';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private readonly supabaseService = inject(SupabaseService);

  getTransactionsForUser(
    userProfileId: string
  ): Observable<PostgrestSingleResponse<TransactionResponseDtoV1[]>> {
    const response = from(
      this.supabaseService.client
        .from('raffle_ticket_purchases')
        .select(transactionSelectStr)
        .eq('profile_id', userProfileId)
    );

    return response;
  }

  getTransactionsForAthlete(
    athleteId: number
  ): Observable<PostgrestSingleResponse<TransactionResponseDtoV1[]>> {
    const response = from(
      this.supabaseService.client
        .from('raffle_ticket_purchases')
        .select(transactionSelectStr)
        .eq('raffles.athletes.id', athleteId)
    );

    return response;
  }

  getTransactionsForUserManagedAthletes(
    userProfileId: string
  ): Observable<PostgrestSingleResponse<TransactionResponseDtoV1[]>> {
    const response = from(
      this.supabaseService.client
        .from('raffle_ticket_purchases')
        .select(transactionSelectStr)
        .eq('raffles.athletes.profiles_x_athletes.profiles_id', userProfileId)
    );

    return response;
  }

  getTransactionSummaryForUser(
    userProfileId: string
  ): Observable<PostgrestSingleResponse<TransactionSummaryResponseDtoV1>> {
    const response = from(
      this.supabaseService.client
        .from('profile_raffle_summary')
        .select(transactionSummarySelectStr)
        .eq('profile_id', userProfileId)
        .single()
    );

    return response;
  }

  getProfileAthleteRaffleSummary(
    userProfileId: string
  ): Observable<
    PostgrestSingleResponse<ProfileAthleteRaffleSummaryResponseDtoV1>
  > {
    const response = from(
      this.supabaseService.client
        .from('profile_athlete_raffle_summary')
        .select(profileAthleteRaffleSummarySelectStr)
        .eq('profile_id', userProfileId)
        .single()
    );

    return response;
  }

  getAthleteRaffleSummary(
    athleteId: number
  ): Observable<PostgrestSingleResponse<AthleteRaffleSummaryResponseDtoV1>> {
    const response = from(
      this.supabaseService.client
        .from('athlete_raffle_summary')
        .select(athleteRaffleSummarySelectStr)
        .eq('athlete_id', athleteId)
        .single()
    );

    return response;
  }
}
