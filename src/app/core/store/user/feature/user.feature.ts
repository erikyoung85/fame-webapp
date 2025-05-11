import { createFeature, createSelector } from '@ngrx/store';
import { AsyncDataStatus } from 'src/app/core/models/AsyncData.model';
import { userReducer } from '../reducers/user.reducer';

export const userFeature = createFeature({
  name: 'user',
  reducer: userReducer,
  extraSelectors: ({ selectSession, selectUserProfile }) => ({
    selectIsSessionLoading: createSelector(
      selectSession,
      (session) => session.status === AsyncDataStatus.Loading
    ),
    selectSupabaseAuthToken: createSelector(
      selectSession,
      (session) => session.data?.access_token
    ),
    selectUserId: createSelector(
      selectSession,
      (session) => session.data?.user?.id
    ),
    selectFavoriteTeamId: createSelector(
      selectUserProfile,
      (userProfile) => userProfile.data?.favoriteTeamId
    ),
  }),
});
