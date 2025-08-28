import { createFeature, createSelector } from '@ngrx/store';
import { isNotNil } from 'ramda';
import { rafflesReducer } from '../reducers/raffles.reducer';

export const rafflesFeature = createFeature({
  name: 'raffles',
  reducer: rafflesReducer,
  extraSelectors: ({ selectRaffleDict }) => {
    const selectAllRaffles = createSelector(selectRaffleDict, (raffleDict) =>
      Object.values(raffleDict).filter((async) => isNotNil(async?.data))
    );

    const selectRaffleById = (raffleId: string) =>
      createSelector(selectRaffleDict, (raffleDict) => raffleDict[raffleId]);

    const selectRafflesForAthlete = (athleteId: number) =>
      createSelector(selectAllRaffles, (raffles) =>
        raffles.filter((raffle) => raffle?.data?.athlete.id === athleteId)
      );

    return {
      selectAllRaffles,
      selectRaffleById,
      selectRafflesForAthlete,
    };
  },
});
