import { Dictionary } from '@ngrx/entity';
import { AsyncData } from 'src/app/core/models/AsyncData.model';
import { Raffle } from 'src/app/core/models/Raffle.model';

export interface RafflesState {
  raffleDict: Dictionary<AsyncData<Raffle | undefined>>;

  isSavingRaffle: boolean;
}
