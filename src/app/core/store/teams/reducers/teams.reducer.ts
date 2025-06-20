import { createReducer, on } from '@ngrx/store';
import {
  AsyncDataStatus,
  wrapAsAsyncData,
} from 'src/app/core/models/AsyncData.model';
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

  on(teamsActions.fetchTeamDetails, (state, action): TeamsState => {
    return {
      ...state,
      teamDetailsDict: {
        ...state.teamDetailsDict,
        [action.teamId]: wrapAsAsyncData(undefined, AsyncDataStatus.Loading),
      },
    };
  }),
  on(teamsActions.fetchTeamDetailsSuccess, (state, action): TeamsState => {
    return {
      ...state,
      teamDetailsDict: {
        ...state.teamDetailsDict,
        [action.teamDetails.id]: wrapAsAsyncData(
          action.teamDetails,
          AsyncDataStatus.Success
        ),
      },
    };
  }),
  on(teamsActions.fetchTeamDetailsFailure, (state, action): TeamsState => {
    return {
      ...state,
      teamDetailsDict: {
        ...state.teamDetailsDict,
        [action.teamId]: wrapAsAsyncData(
          undefined,
          AsyncDataStatus.Error,
          action.message
        ),
      },
    };
  }),

  on(teamsActions.updateTeam, (state, action): TeamsState => {
    return {
      ...state,
      teamDetailsDict: {
        ...state.teamDetailsDict,
        [action.request.id]: wrapAsAsyncData(
          state.teamDetailsDict[action.request.id]?.data,
          AsyncDataStatus.Loading
        ),
      },
    };
  }),
  on(teamsActions.updateTeamSuccess, (state, action): TeamsState => {
    return {
      ...state,
      teamDetailsDict: {
        ...state.teamDetailsDict,
        [action.teamDetails.id]: wrapAsAsyncData(
          action.teamDetails,
          AsyncDataStatus.Success
        ),
      },
    };
  }),
  on(teamsActions.updateTeamFailure, (state, action): TeamsState => {
    return {
      ...state,
      teamDetailsDict: {
        ...state.teamDetailsDict,
        [action.teamId]: wrapAsAsyncData(
          state.teamDetailsDict[action.teamId]?.data,
          AsyncDataStatus.Success
        ),
      },
    };
  })
);
