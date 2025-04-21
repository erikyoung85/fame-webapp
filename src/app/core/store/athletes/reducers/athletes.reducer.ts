import { createReducer, on } from '@ngrx/store';
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
  })
);
