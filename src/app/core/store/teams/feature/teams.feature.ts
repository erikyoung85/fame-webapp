import { createFeature, createSelector } from '@ngrx/store';
import { teamsReducer } from '../reducers/teams.reducer';
import { teamsEntityAdapter } from '../state/teams.state';

export const teamsFeature = createFeature({
  name: 'teams',
  reducer: teamsReducer,
  extraSelectors: ({ selectTeamsState, selectTeamDetailsDict }) => ({
    ...teamsEntityAdapter.getSelectors(selectTeamsState),

    selectTeamDetails: (teamId: number) =>
      createSelector(
        selectTeamDetailsDict,
        (teamDetailsDict) => teamDetailsDict[teamId]
      ),
  }),
});
