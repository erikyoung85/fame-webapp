import { AsyncData } from 'src/app/core/models/AsyncData.model';
import { AthleteRaffleSummary } from 'src/app/core/models/AthleteRaffleSummary.model';
import { RaffleTransaction } from 'src/app/core/models/RaffleTransaction.model';
import { RaffleTransactionSummary } from 'src/app/core/models/RaffleTransactionSummary.model';
import { UserManagedAthletesRaffleSummary } from 'src/app/core/models/UserManagedAthletesRaffleSummary.model';

export interface TransactionState {
  transactions: AsyncData<RaffleTransaction[]>;
  transactionSummary: AsyncData<RaffleTransactionSummary | undefined>;
  userManagedAthletesRaffleSummary: AsyncData<
    UserManagedAthletesRaffleSummary | undefined
  >;

  transactionsByAthleteId: Partial<{
    [athleteId: number]: AsyncData<RaffleTransaction[]>;
  }>;
  raffleSummaryByAthleteId: Partial<{
    [athleteId: number]: AsyncData<AthleteRaffleSummary | undefined>;
  }>;
}
