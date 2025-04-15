import { createFeature, createSelector } from '@ngrx/store';
import { userReducer } from '../reducers/user.reducer';

export const userFeature = createFeature({
  name: 'user',
  reducer: userReducer,
  extraSelectors: ({ selectSession, selectUserProfile }) => ({
    selectIsSessionLoading: createSelector(
      selectSession,
      (session) => session.loading
    ),
    selectIsLoggedIn: createSelector(
      selectUserProfile,
      (userProfile) => userProfile.data !== undefined
    ),
  }),
});
