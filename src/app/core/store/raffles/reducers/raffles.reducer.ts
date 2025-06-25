import { createReducer, on } from '@ngrx/store';
import { rafflesActions } from '../actions/raffles.actions';
import { INITIAL_RAFFLES_STATE } from '../state/raffles.initial-state';
import { rafflesEntityAdapter, RafflesState } from '../state/raffles.state';

export const rafflesReducer = createReducer(
  INITIAL_RAFFLES_STATE,
  on(rafflesActions.fetchRaffles, (state): RafflesState => {
    return {
      ...state,
      isLoading: true,
      error: undefined,
    };
  }),
  on(rafflesActions.fetchRafflesSuccess, (state, action): RafflesState => {
    return rafflesEntityAdapter.upsertMany<RafflesState>(action.raffles, {
      ...state,
      isLoading: false,
      error: undefined,
    });
  }),
  on(rafflesActions.fetchRafflesFailure, (state, action): RafflesState => {
    return {
      ...state,
      isLoading: false,
      error: action.message,
    };
  }),

  on(rafflesActions.createRaffleSuccess, (state, action): RafflesState => {
    return rafflesEntityAdapter.upsertOne<RafflesState>(action.raffle, {
      ...state,
      isLoading: false,
      error: undefined,
    });
  })
);
