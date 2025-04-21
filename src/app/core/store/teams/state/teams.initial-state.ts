import { wrapAsAsyncData } from 'src/app/core/models/AsyncData.model';
import { teamsEntityAdapter, TeamsState } from './teams.state';

export const INITIAL_TEAMS_STATE: TeamsState =
  teamsEntityAdapter.getInitialState({
    teamDetails: wrapAsAsyncData(undefined),
    isLoading: false,
    error: undefined,
  });
