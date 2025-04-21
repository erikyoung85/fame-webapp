import { teamsEntityAdapter, TeamsState } from './teams.state';

export const INITIAL_TEAMS_STATE: TeamsState =
  teamsEntityAdapter.getInitialState({
    isLoading: false,
    error: undefined,
  });
