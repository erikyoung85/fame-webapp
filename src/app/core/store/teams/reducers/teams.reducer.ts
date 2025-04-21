import { createReducer, on } from '@ngrx/store';
import { wrapAsAsyncData } from 'src/app/core/models/AsyncData.model';
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
  }),

  on(teamsActions.clearTeamDetails, (state): TeamsState => {
    return {
      ...state,
      teamDetails: wrapAsAsyncData(undefined, false),
    };
  }),
  on(teamsActions.fetchTeamDetails, (state): TeamsState => {
    return {
      ...state,
      teamDetails: wrapAsAsyncData(undefined, true),
    };
  }),
  on(teamsActions.fetchTeamDetailsSuccess, (state, action): TeamsState => {
    return {
      ...state,
      teamDetails: wrapAsAsyncData(action.teamDetails, false),
    };
  }),
  on(teamsActions.fetchTeamDetailsFailure, (state, action): TeamsState => {
    return {
      ...state,
      teamDetails: wrapAsAsyncData(undefined, false, action.message),
    };
  })
);
