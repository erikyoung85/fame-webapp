import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Raffle } from 'src/app/core/models/Raffle.model';

export interface RafflesState extends EntityState<Raffle> {
  isLoading: boolean;
  error: string | undefined;
}

export const rafflesEntityAdapter = createEntityAdapter<Raffle>({
  selectId: (raffle) => raffle.id,
  sortComparer: false,
});
