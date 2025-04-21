import { createFeature } from '@ngrx/store';
import { athletesReducer } from '../reducers/athletes.reducer';
import { athletesEntityAdapter } from '../state/athletes.state';

export const athletesFeature = createFeature({
  name: 'athletes',
  reducer: athletesReducer,
  extraSelectors: ({ selectAthletesState }) => ({
    ...athletesEntityAdapter.getSelectors(selectAthletesState),
  }),
});
