import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Raffle } from 'src/app/core/models/Raffle.model';
import { CreateRaffleRequestDtoV1 } from 'src/app/core/services/raffle/dtos/requests/create-raffle.request.dto.v1';

export const rafflesActions = createActionGroup({
  source: 'Raffles',
  events: {
    'Fetch Raffles': emptyProps(),
    'Fetch Raffles Success': props<{ raffles: Raffle[] }>(),
    'Fetch Raffles Failure': props<{ message?: string }>(),

    'Create Raffle': props<{ request: CreateRaffleRequestDtoV1 }>(),
    'Create Raffle Success': props<{ raffle: Raffle }>(),
    'Create Raffle Failure': props<{ message?: string }>(),
  },
});
