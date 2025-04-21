import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Athlete } from 'src/app/core/models/Athlete.model';

export interface AthletesState extends EntityState<Athlete> {
  isLoading: boolean;
  error: string | undefined;
}

export const athletesEntityAdapter = createEntityAdapter<Athlete>({
  selectId: (athlete) => athlete.id,
  sortComparer: false,
});
