import { createFeature, createSelector } from '@ngrx/store';
import { AsyncDataStatus } from 'src/app/core/async-data';
import { userReducer } from '../reducers/user.reducer';

export const userFeature = createFeature({
  name: 'user',
  reducer: userReducer,
  extraSelectors: ({
    selectSession,
    selectUserProfile,
    selectManagedPages,
  }) => {
    const selectIsSessionLoading = createSelector(
      selectSession,
      (session) => session.status === AsyncDataStatus.Loading
    );

    const selectSupabaseAuthToken = createSelector(
      selectSession,
      (session) => session.data?.access_token
    );

    const selectUserId = createSelector(
      selectSession,
      (session) => session.data?.user?.id
    );

    const selectFavoriteTeamId = createSelector(
      selectUserProfile,
      (userProfile) => userProfile.data?.favoriteTeamId
    );

    const selectIsUserAdmin = createSelector(
      selectUserProfile,
      (userProfile) => userProfile.data?.isAdmin ?? false
    );

    const selectManagedAthletePages = createSelector(
      selectManagedPages,
      (managedPages) => managedPages.data.athletes
    );

    const selectManagedTeamPages = createSelector(
      selectManagedPages,
      (managedPages) => managedPages.data.teams
    );

    const selectManagedRaffles = createSelector(
      selectManagedPages,
      (managedPages) => managedPages.data.raffles
    );

    const selectIsAthleteManager = (athleteId: number) =>
      createSelector(
        selectManagedAthletePages,
        selectIsUserAdmin,
        (managedAthletePages, isAdmin) =>
          isAdmin ||
          managedAthletePages.some((athlete) => athlete.id === athleteId)
      );

    const selectIsTeamManager = (teamId: number) =>
      createSelector(
        selectManagedTeamPages,
        selectIsUserAdmin,
        (managedTeamPages, isAdmin) =>
          isAdmin || managedTeamPages.some((team) => team.id === teamId)
      );

    const selectIsRaffleManager = (raffleId: number) =>
      createSelector(
        selectManagedRaffles,
        selectIsUserAdmin,
        (managedRaffles, isAdmin) =>
          isAdmin || managedRaffles.some((raffle) => raffle.id === raffleId)
      );

    return {
      selectIsSessionLoading,
      selectSupabaseAuthToken,
      selectUserId,
      selectFavoriteTeamId,
      selectIsUserAdmin,
      selectManagedAthletePages,
      selectManagedTeamPages,
      selectManagedRaffles,
      selectIsAthleteManager,
      selectIsTeamManager,
      selectIsRaffleManager,
    };
  },
});
