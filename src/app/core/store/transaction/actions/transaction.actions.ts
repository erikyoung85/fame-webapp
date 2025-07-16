import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AthleteRaffleSummary } from 'src/app/core/models/AthleteRaffleSummary.model';
import { RaffleTransaction } from 'src/app/core/models/RaffleTransaction.model';
import { RaffleTransactionSummary } from 'src/app/core/models/RaffleTransactionSummary.model';
import { UserManagedAthletesRaffleSummary } from 'src/app/core/models/UserManagedAthletesRaffleSummary.model';

export const transactionActions = createActionGroup({
  source: 'Transaction',
  events: {
    'Fetch Transactions for User': emptyProps(),
    'Fetch Transactions for User Success': props<{
      transactions: RaffleTransaction[];
    }>(),
    'Fetch Transactions for User Failure': props<{
      message: string;
    }>(),

    'Fetch Transaction Summary for User': emptyProps(),
    'Fetch Transaction Summary for User Success': props<{
      transactionSummary: RaffleTransactionSummary;
    }>(),
    'Fetch Transaction Summary for User Failure': props<{
      message: string;
    }>(),

    'Fetch Transactions for User Managed Athletes': emptyProps(),
    'Fetch Transactions for User Managed Athletes Success': props<{
      transactions: RaffleTransaction[];
    }>(),
    'Fetch Transactions for User Managed Athletes Failure': props<{
      message: string;
    }>(),

    'Fetch Raffle Summary for User Managed Athletes': emptyProps(),
    'Fetch Raffle Summary for User Managed Athletes Success': props<{
      raffleSummary: UserManagedAthletesRaffleSummary;
    }>(),
    'Fetch Raffle Summary for User Managed Athletes Failure': props<{
      message: string;
    }>(),

    'Fetch Transactions for Athlete': props<{ athleteId: number }>(),
    'Fetch Transactions for Athlete Success': props<{
      athleteId: number;
      transactions: RaffleTransaction[];
    }>(),
    'Fetch Transactions for Athlete Failure': props<{
      athleteId: number;
      message: string;
    }>(),

    'Fetch Raffle Summary for Athlete': props<{ athleteId: number }>(),
    'Fetch Raffle Summary for Athlete Success': props<{
      raffleSummary: AthleteRaffleSummary;
    }>(),
    'Fetch Raffle Summary for Athlete Failure': props<{
      athleteId: number;
      message: string;
    }>(),
  },
});
