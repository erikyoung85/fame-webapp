import { createReducer, on } from '@ngrx/store';
import { teamsActions } from '../actions/teams.actions';
import { INITIAL_TEAMS_STATE } from '../state/teams.initial-state';
import { teamsEntityAdapter, TeamsState } from '../state/teams.state';

export const teamsReducer = createReducer(
  INITIAL_TEAMS_STATE,
  on(teamsActions.fetchTeams, (state): TeamsState => {
    return teamsEntityAdapter.removeAll<TeamsState>({
      ...state,
      isLoading: true,
      error: undefined,
    });
  }),
  on(teamsActions.fetchTeamsSuccess, (state, action): TeamsState => {
    return teamsEntityAdapter.addMany<TeamsState>(action.teams, {
      ...state,
      isLoading: false,
      error: undefined,
    });
  }),
  on(teamsActions.fetchTeamsFailure, (state, action): TeamsState => {
    return {
      ...state,
      isLoading: false,
      error: action.message,
    };
  })
);
