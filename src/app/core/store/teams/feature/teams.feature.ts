import { createFeature, createSelector } from '@ngrx/store';
import {
  AsyncDataStatus,
  wrapAsAsyncData,
} from 'src/app/core/models/AsyncData.model';
import { userFeature } from '../../user/feature/user.feature';
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

    selectFavoriteTeam: createSelector(
      userFeature.selectIsLoggedIn,
      userFeature.selectUserProfile,
      userFeature.selectFavoriteTeamId,
      selectTeamDetailsDict,
      (isLoggedIn, userProfile, favoriteTeamId, teamDetailsDict) => {
        if (isLoggedIn === false) return undefined;

        if (userProfile.status !== AsyncDataStatus.Success)
          return wrapAsAsyncData(undefined, userProfile.status);

        if (favoriteTeamId === undefined) return undefined;

        const favoriteTeamDetails = teamDetailsDict[favoriteTeamId];
        if (favoriteTeamDetails === undefined)
          return wrapAsAsyncData(undefined, AsyncDataStatus.Idle);

        return favoriteTeamDetails;
      }
    ),
  }),
});
