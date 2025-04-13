import { createFeature, createSelector } from '@ngrx/store';
import { userReducer } from '../reducers/user.reducer';

export const userFeature = createFeature({
  name: 'user',
  reducer: userReducer,
  extraSelectors: ({ selectSession }) => ({
    selectIsLoginLoading: createSelector(
      selectSession,
      (session) => session.loading
    ),
    selectIsLoggedIn: createSelector(
      selectSession,
      (session) => session.data !== undefined
    ),
    selectUser: createSelector(selectSession, (session) => session.data?.user),
  }),
});
