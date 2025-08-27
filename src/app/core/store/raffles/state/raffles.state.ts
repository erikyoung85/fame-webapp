import { Dictionary } from '@ngrx/entity';
import { AsyncData } from 'src/app/core/async-data';
import { Raffle } from 'src/app/core/models/Raffle.model';

export interface RafflesState {
  raffleDict: Dictionary<AsyncData<Raffle | undefined>>;
}
