import { wrapAsAsyncData } from 'src/app/core/async-data';
import { RafflesState } from './raffles.state';

export const INITIAL_RAFFLES_STATE: RafflesState = {
  raffleDict: {},
  trendingRaffles: wrapAsAsyncData([]),
};
