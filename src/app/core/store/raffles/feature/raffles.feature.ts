import { createFeature, createSelector } from '@ngrx/store';
import { rafflesReducer } from '../reducers/raffles.reducer';
import { rafflesEntityAdapter } from '../state/raffles.state';

export const rafflesFeature = createFeature({
  name: 'raffles',
  reducer: rafflesReducer,
  extraSelectors: ({ selectRafflesState }) => {
    const entityAdapterSelectors =
      rafflesEntityAdapter.getSelectors(selectRafflesState);

    const selectRafflesForAthlete = (athleteId: number) =>
      createSelector(entityAdapterSelectors.selectAll, (raffles) =>
        raffles.filter((raffle) => raffle.athlete.id === athleteId)
      );

    return {
      ...entityAdapterSelectors,
      selectRafflesForAthlete,
    };
  },
});
