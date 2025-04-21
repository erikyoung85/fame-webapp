import { inject, Injectable } from '@angular/core';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { from, Observable } from 'rxjs';
import { SupabaseService } from '../supabase/supabase.service';
import { AthleteResponseDtoV1 } from './dtos/responses/athletes.response.dto.v1';

@Injectable({
  providedIn: 'root',
})
export class AthletesService {
  private readonly supabaseService = inject(SupabaseService);

  getAllAthletes(): Observable<
    PostgrestSingleResponse<AthleteResponseDtoV1[]>
  > {
    return from(
      this.supabaseService.client
        .from('athletes')
        .select(
          'id, first_name, last_name, date_of_birth, gender, schools(id, name, abbreviation), roster_entries(id, jersey_number, position, teams(id, name, sports(id, name)))'
        )
    );
  }
}
