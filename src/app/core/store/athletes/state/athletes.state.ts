import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { AsyncData } from 'src/app/core/async-data';
import { Athlete } from 'src/app/core/models/Athlete.model';
import { AthleteDetail } from 'src/app/core/models/AthleteDetail.model';

export interface AthletesState extends EntityState<Athlete> {
  isLoading: boolean;
  error: string | undefined;

  athleteDetailsDict: Partial<{
    [athleteId: number]: AsyncData<AthleteDetail | undefined>;
  }>;

  trendingAthletes: AsyncData<Athlete[]>;
}

export const athletesEntityAdapter = createEntityAdapter<Athlete>({
  selectId: (athlete) => athlete.id,
  sortComparer: false,
});
