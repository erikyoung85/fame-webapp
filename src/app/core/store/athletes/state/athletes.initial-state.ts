import { wrapAsAsyncData } from 'src/app/core/async-data';
import { athletesEntityAdapter, AthletesState } from './athletes.state';

export const INITIAL_ATHLETES_STATE: AthletesState =
  athletesEntityAdapter.getInitialState({
    isLoading: false,
    error: undefined,

    athleteDetailsDict: {},

    trendingAthletes: wrapAsAsyncData([]),
  });
