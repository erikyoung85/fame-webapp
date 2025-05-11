import { createFeature, createSelector } from '@ngrx/store';
import { athletesReducer } from '../reducers/athletes.reducer';
import { athletesEntityAdapter } from '../state/athletes.state';

export const athletesFeature = createFeature({
  name: 'athletes',
  reducer: athletesReducer,
  extraSelectors: ({ selectAthletesState, selectAthleteDetailsDict }) => ({
    ...athletesEntityAdapter.getSelectors(selectAthletesState),

    selectAthleteDetails: (athleteId: number) =>
      createSelector(
        selectAthleteDetailsDict,
        (athleteDetailsDict) => athleteDetailsDict[athleteId]
      ),
  }),
});
