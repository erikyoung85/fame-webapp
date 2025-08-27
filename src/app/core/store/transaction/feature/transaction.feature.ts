import { createFeature, createSelector } from '@ngrx/store';
import { AsyncDataStatus, wrapAsAsyncData } from 'src/app/core/async-data';
import { transactionReducer } from '../reducers/transaction.reducer';

export const transactionFeature = createFeature({
  name: 'transaction',
  reducer: transactionReducer,
  extraSelectors: ({
    selectTransactionsByAthleteId,
    selectRaffleSummaryByAthleteId,
  }) => {
    const selectTransactionsForAthletes = (athleteIds: number[]) =>
      createSelector(
        selectTransactionsByAthleteId,
        (transactionsByAthleteId) => {
          const allAsync = athleteIds.map((id) => transactionsByAthleteId[id]);
          const isLoading = allAsync.some(
            (async) => async?.status === AsyncDataStatus.Loading
          );
          const transactions = athleteIds.flatMap(
            (id) => transactionsByAthleteId[id]?.data ?? []
          );
          return isLoading
            ? wrapAsAsyncData(transactions, AsyncDataStatus.Loading)
            : wrapAsAsyncData(transactions, AsyncDataStatus.Success);
        }
      );

    const selectRaffleSummaryForAthlete = (athleteId: number) =>
      createSelector(
        selectRaffleSummaryByAthleteId,
        (raffleSummaryByAthleteId) => {
          return raffleSummaryByAthleteId[athleteId];
        }
      );

    return {
      selectTransactionsForAthletes,
      selectRaffleSummaryForAthlete,
    };
  },
});
