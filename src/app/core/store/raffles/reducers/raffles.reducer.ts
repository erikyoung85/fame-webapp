import { createReducer, on } from '@ngrx/store';
import { indexBy } from 'ramda';
import {
  AsyncDataStatus,
  wrapAsAsyncData,
} from 'src/app/core/models/AsyncData.model';
import { rafflesActions } from '../actions/raffles.actions';
import { INITIAL_RAFFLES_STATE } from '../state/raffles.initial-state';
import { RafflesState } from '../state/raffles.state';

export const rafflesReducer = createReducer(
  INITIAL_RAFFLES_STATE,
  on(rafflesActions.fetchRaffle, (state, action): RafflesState => {
    return {
      ...state,
      raffleDict: {
        ...state.raffleDict,
        [action.raffleId]: wrapAsAsyncData(undefined, AsyncDataStatus.Loading),
      },
    };
  }),
  on(rafflesActions.fetchRaffleSuccess, (state, action): RafflesState => {
    return {
      ...state,
      raffleDict: {
        ...state.raffleDict,
        [action.raffle.id]: wrapAsAsyncData(
          action.raffle,
          AsyncDataStatus.Success
        ),
      },
    };
  }),
  on(rafflesActions.fetchRaffleFailure, (state, action): RafflesState => {
    return {
      ...state,
      raffleDict: {
        ...state.raffleDict,
        [action.raffleId]: wrapAsAsyncData(
          undefined,
          AsyncDataStatus.Error,
          action.message
        ),
      },
    };
  }),

  on(
    rafflesActions.fetchRafflesForAthleteSuccess,
    (state, action): RafflesState => {
      const asyncRaffles = action.raffles.map((raffle) =>
        wrapAsAsyncData(raffle, AsyncDataStatus.Success)
      );

      const groupedRaffles = indexBy(
        (raffle) => raffle.data.athlete.id,
        asyncRaffles
      );

      return {
        ...state,
        raffleDict: {
          ...state.raffleDict,
          ...groupedRaffles,
        },
      };
    }
  ),

  on(rafflesActions.createRaffleSuccess, (state, action): RafflesState => {
    const asyncRaffle = wrapAsAsyncData(action.raffle, AsyncDataStatus.Success);
    return {
      ...state,
      raffleDict: {
        ...state.raffleDict,
        [action.raffle.id]: asyncRaffle,
      },
    };
  })
);
