import { createReducer, on } from '@ngrx/store';
import { AsyncDataStatus, wrapAsAsyncData } from 'src/app/core/async-data';
import { transactionActions } from '../actions/transaction.actions';
import { INITIAL_TRANSACTION_STATE } from '../state/transaction.initial-state';
import { TransactionState } from '../state/transaction.state';

export const transactionReducer = createReducer(
  INITIAL_TRANSACTION_STATE,
  on(
    transactionActions.fetchTransactionsForUser,
    (state, action): TransactionState => {
      return {
        ...state,
        transactions: wrapAsAsyncData([], AsyncDataStatus.Loading),
      };
    }
  ),
  on(
    transactionActions.fetchTransactionsForUserSuccess,
    (state, action): TransactionState => {
      return {
        ...state,
        transactions: wrapAsAsyncData(
          action.transactions,
          AsyncDataStatus.Success
        ),
      };
    }
  ),
  on(
    transactionActions.fetchTransactionsForUserFailure,
    (state, action): TransactionState => {
      return {
        ...state,
        transactions: wrapAsAsyncData(
          [],
          AsyncDataStatus.Error,
          action.message
        ),
      };
    }
  ),

  on(
    transactionActions.fetchTransactionSummaryForUser,
    (state, action): TransactionState => {
      return {
        ...state,
        transactionSummary: wrapAsAsyncData(undefined, AsyncDataStatus.Loading),
      };
    }
  ),
  on(
    transactionActions.fetchTransactionSummaryForUserSuccess,
    (state, action): TransactionState => {
      return {
        ...state,
        transactionSummary: wrapAsAsyncData(
          action.transactionSummary,
          AsyncDataStatus.Success
        ),
      };
    }
  ),
  on(
    transactionActions.fetchTransactionSummaryForUserFailure,
    (state, action): TransactionState => {
      return {
        ...state,
        transactionSummary: wrapAsAsyncData(
          undefined,
          AsyncDataStatus.Error,
          action.message
        ),
      };
    }
  ),

  on(
    transactionActions.fetchTransactionsForUserManagedAthletes,
    (state): TransactionState => {
      return {
        ...state,
        userManagedAthletesTransactions: wrapAsAsyncData(
          [],
          AsyncDataStatus.Loading
        ),
      };
    }
  ),
  on(
    transactionActions.fetchTransactionsForUserManagedAthletesSuccess,
    (state, action): TransactionState => {
      return {
        ...state,
        userManagedAthletesTransactions: wrapAsAsyncData(
          action.transactions,
          AsyncDataStatus.Success
        ),
      };
    }
  ),
  on(
    transactionActions.fetchTransactionsForUserManagedAthletesFailure,
    (state, action): TransactionState => {
      return {
        ...state,
        userManagedAthletesTransactions: wrapAsAsyncData(
          [],
          AsyncDataStatus.Error,
          action.message
        ),
      };
    }
  ),

  on(
    transactionActions.fetchRaffleSummaryForUserManagedAthletes,
    (state, action): TransactionState => {
      return {
        ...state,
        userManagedAthletesRaffleSummary: wrapAsAsyncData(
          undefined,
          AsyncDataStatus.Loading
        ),
      };
    }
  ),
  on(
    transactionActions.fetchRaffleSummaryForUserManagedAthletesSuccess,
    (state, action): TransactionState => {
      return {
        ...state,
        userManagedAthletesRaffleSummary: wrapAsAsyncData(
          action.raffleSummary,
          AsyncDataStatus.Success
        ),
      };
    }
  ),
  on(
    transactionActions.fetchRaffleSummaryForUserManagedAthletesFailure,
    (state, action): TransactionState => {
      return {
        ...state,
        userManagedAthletesRaffleSummary: wrapAsAsyncData(
          undefined,
          AsyncDataStatus.Error,
          action.message
        ),
      };
    }
  ),

  on(
    transactionActions.fetchTransactionsForAthlete,
    (state, action): TransactionState => {
      return {
        ...state,
        transactionsByAthleteId: {
          ...state.transactionsByAthleteId,
          [action.athleteId]: wrapAsAsyncData([], AsyncDataStatus.Loading),
        },
      };
    }
  ),
  on(
    transactionActions.fetchTransactionsForAthleteSuccess,
    (state, action): TransactionState => {
      return {
        ...state,
        transactionsByAthleteId: {
          ...state.transactionsByAthleteId,
          [action.athleteId]: wrapAsAsyncData(
            action.transactions,
            AsyncDataStatus.Success
          ),
        },
      };
    }
  ),
  on(
    transactionActions.fetchTransactionsForAthleteFailure,
    (state, action): TransactionState => {
      return {
        ...state,
        transactionsByAthleteId: {
          ...state.transactionsByAthleteId,
          [action.athleteId]: wrapAsAsyncData(
            [],
            AsyncDataStatus.Error,
            action.message
          ),
        },
      };
    }
  ),

  on(
    transactionActions.fetchRaffleSummaryForAthlete,
    (state, action): TransactionState => {
      return {
        ...state,
        raffleSummaryByAthleteId: {
          ...state.raffleSummaryByAthleteId,
          [action.athleteId]: wrapAsAsyncData(
            undefined,
            AsyncDataStatus.Loading
          ),
        },
      };
    }
  ),
  on(
    transactionActions.fetchRaffleSummaryForAthleteSuccess,
    (state, action): TransactionState => {
      return {
        ...state,
        raffleSummaryByAthleteId: {
          ...state.raffleSummaryByAthleteId,
          [action.raffleSummary.athleteId]: wrapAsAsyncData(
            action.raffleSummary,
            AsyncDataStatus.Success
          ),
        },
      };
    }
  ),
  on(
    transactionActions.fetchRaffleSummaryForAthleteFailure,
    (state, action): TransactionState => {
      return {
        ...state,
        raffleSummaryByAthleteId: {
          ...state.raffleSummaryByAthleteId,
          [action.athleteId]: wrapAsAsyncData(
            undefined,
            AsyncDataStatus.Error,
            action.message
          ),
        },
      };
    }
  )
);
