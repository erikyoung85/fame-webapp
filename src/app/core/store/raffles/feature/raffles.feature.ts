import { createFeature, createSelector } from '@ngrx/store';
import { compareDesc } from 'date-fns';
import { isNotNil } from 'ramda';
import { AsyncData } from 'src/app/core/models/AsyncData.model';
import { Raffle } from 'src/app/core/models/Raffle.model';
import { rafflesReducer } from '../reducers/raffles.reducer';

export const rafflesFeature = createFeature({
  name: 'raffles',
  reducer: rafflesReducer,
  extraSelectors: ({ selectRaffleDict }) => {
    const selectAllRaffles = createSelector(selectRaffleDict, (raffleDict) => {
      const raffles: AsyncData<Raffle>[] = [];
      Object.values(raffleDict).forEach((raffle) => {
        if (isNotNil(raffle?.data)) {
          raffles.push(raffle as AsyncData<Raffle>);
        }
      });
      return raffles.sort((a, b) =>
        compareDesc(a.data.endDate, b.data.endDate)
      );
    });

    const selectRaffleById = (raffleId: number) =>
      createSelector(selectRaffleDict, (raffleDict) => raffleDict[raffleId]);

    const selectRafflesForAthlete = (athleteId: number) =>
      createSelector(selectAllRaffles, (raffles) =>
        raffles.filter((raffle) => raffle.data.athlete.id === athleteId)
      );

    return {
      selectAllRaffles,
      selectRaffleById,
      selectRafflesForAthlete,
    };
  },
});
