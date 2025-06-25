import { rafflesEntityAdapter, RafflesState } from './raffles.state';

export const INITIAL_RAFFLES_STATE: RafflesState =
  rafflesEntityAdapter.getInitialState({
    isLoading: false,
    error: undefined,
  });
