import { createFeature } from '@ngrx/store';
import { userReducer } from '../reducers/user.reducer';

export const userFeature = createFeature({
  name: 'user',
  reducer: userReducer,
});
