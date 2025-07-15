import { wrapAsAsyncData } from 'src/app/core/models/AsyncData.model';
import { TransactionState } from './transaction.state';

export const INITIAL_TRANSACTION_STATE: TransactionState = {
  transactions: wrapAsAsyncData([]),
  transactionSummary: wrapAsAsyncData(undefined),
  userManagedAthletesRaffleSummary: wrapAsAsyncData(undefined),

  transactionsByAthleteId: {},
  raffleSummaryByAthleteId: {},
};
