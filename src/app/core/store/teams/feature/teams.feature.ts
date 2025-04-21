import { createFeature } from '@ngrx/store';
import { teamsReducer } from '../reducers/teams.reducer';
import { teamsEntityAdapter } from '../state/teams.state';

export const teamsFeature = createFeature({
  name: 'teams',
  reducer: teamsReducer,
  extraSelectors: ({ selectTeamsState }) => ({
    ...teamsEntityAdapter.getSelectors(selectTeamsState),
  }),
});
