import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Raffle } from 'src/app/core/models/Raffle.model';
import { CreateRaffleRequestDtoV1 } from 'src/app/core/services/raffle/dtos/requests/create-raffle.request.dto.v1';

export const rafflesActions = createActionGroup({
  source: 'Raffles',
  events: {
    'Fetch Raffle': props<{ raffleId: number }>(),
    'Fetch Raffle Success': props<{ raffle: Raffle }>(),
    'Fetch Raffle Failure': props<{ raffleId: number; message?: string }>(),

    'Fetch Raffles For Athlete': props<{ athleteId: number }>(),
    'Fetch Raffles For Athlete Success': props<{ raffles: Raffle[] }>(),
    'Fetch Raffles For Athlete Failure': props<{ message?: string }>(),

    'Create Raffle': props<{ request: CreateRaffleRequestDtoV1 }>(),
    'Create Raffle Success': props<{ raffle: Raffle }>(),
    'Create Raffle Failure': props<{ message?: string }>(),

    'Update Raffle': props<{ request: Raffle }>(),
    'Update Raffle Success': props<{ raffle: Raffle }>(),
    'Update Raffle Failure': props<{ message?: string }>(),

    'Fetch Trending Raffles': emptyProps(),
    'Fetch Trending Raffles Success': props<{ raffles: Raffle[] }>(),
    'Fetch Trending Raffles Failure': props<{ message: string }>(),
  },
});
