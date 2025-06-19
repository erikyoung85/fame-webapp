import { createReducer, on } from '@ngrx/store';
import {
  AsyncDataStatus,
  wrapAsAsyncData,
} from 'src/app/core/models/AsyncData.model';
import { athletesActions } from '../actions/athletes.actions';
import { INITIAL_ATHLETES_STATE } from '../state/athletes.initial-state';
import { athletesEntityAdapter, AthletesState } from '../state/athletes.state';

export const athletesReducer = createReducer(
  INITIAL_ATHLETES_STATE,
  on(athletesActions.fetchAthletes, (state): AthletesState => {
    return athletesEntityAdapter.removeAll<AthletesState>({
      ...state,
      isLoading: true,
      error: undefined,
    });
  }),
  on(athletesActions.fetchAthletesSuccess, (state, action): AthletesState => {
    return athletesEntityAdapter.addMany<AthletesState>(action.athletes, {
      ...state,
      isLoading: false,
      error: undefined,
    });
  }),
  on(athletesActions.fetchAthletesFailure, (state, action): AthletesState => {
    return {
      ...state,
      isLoading: false,
      error: action.message,
    };
  }),

  on(athletesActions.fetchAthleteDetails, (state, action): AthletesState => {
    return {
      ...state,
      athleteDetailsDict: {
        ...state.athleteDetailsDict,
        [action.athleteId]: wrapAsAsyncData(undefined, AsyncDataStatus.Loading),
      },
    };
  }),
  on(
    athletesActions.fetchAthleteDetailsSuccess,
    (state, action): AthletesState => {
      return {
        ...state,
        athleteDetailsDict: {
          ...state.athleteDetailsDict,
          [action.athleteDetails.id]: wrapAsAsyncData(
            action.athleteDetails,
            AsyncDataStatus.Success
          ),
        },
      };
    }
  ),
  on(
    athletesActions.fetchAthleteDetailsFailure,
    (state, action): AthletesState => {
      return {
        ...state,
        athleteDetailsDict: {
          ...state.athleteDetailsDict,
          [action.athleteId]: wrapAsAsyncData(
            undefined,
            AsyncDataStatus.Error,
            action.message
          ),
        },
      };
    }
  ),

  on(athletesActions.updateAthlete, (state, action): AthletesState => {
    return {
      ...state,
      athleteDetailsDict: {
        ...state.athleteDetailsDict,
        [action.request.id]: wrapAsAsyncData(
          state.athleteDetailsDict[action.request.id]?.data,
          AsyncDataStatus.Loading
        ),
      },
    };
  }),
  on(athletesActions.updateAthleteSuccess, (state, action): AthletesState => {
    return {
      ...state,
      athleteDetailsDict: {
        ...state.athleteDetailsDict,
        [action.athleteDetails.id]: wrapAsAsyncData(
          action.athleteDetails,
          AsyncDataStatus.Success
        ),
      },
    };
  }),
  on(athletesActions.updateAthleteFailure, (state, action): AthletesState => {
    return {
      ...state,
      athleteDetailsDict: {
        ...state.athleteDetailsDict,
        [action.athleteId]: wrapAsAsyncData(
          state.athleteDetailsDict[action.athleteId]?.data,
          AsyncDataStatus.Success
        ),
      },
    };
  })
);
