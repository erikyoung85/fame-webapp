import { inject, Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular/standalone';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { isNotNil } from 'ramda';
import {
  catchError,
  filter,
  map,
  of,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { AthleteRaffleSummaryFactory } from 'src/app/core/models/AthleteRaffleSummary.model';
import {
  RaffleTransactionFactory,
  RaffleTransactionType,
} from 'src/app/core/models/RaffleTransaction.model';
import { RaffleTransactionSummaryFactory } from 'src/app/core/models/RaffleTransactionSummary.model';
import { UserManagedAthletesRaffleSummaryFactory } from 'src/app/core/models/UserManagedAthletesRaffleSummary.model';
import { TransactionService } from 'src/app/core/services/transaction/transaction.service';
import { userFeature } from '../../user/feature/user.feature';
import { transactionActions } from '../actions/transaction.actions';

@Injectable()
export class TransactionEffects {
  private readonly actions$ = inject(Actions);
  private readonly toastController = inject(ToastController);
  private readonly transactionService = inject(TransactionService);
  private readonly store = inject(Store);

  failureMessages$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          transactionActions.fetchTransactionsForUserFailure,
          transactionActions.fetchTransactionsForAthleteFailure
        ),
        tap(async (action) => {
          if (action.message !== undefined) {
            await this.toastController
              .create({
                message: action.message,
                duration: 2000,
                color: 'danger',
              })
              .then((toast) => toast.present());
          }
        })
      ),
    { dispatch: false }
  );

  fetchTransactionsForUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(transactionActions.fetchTransactionsForUser),
      withLatestFrom(
        this.store.select(userFeature.selectUserId).pipe(filter(isNotNil))
      ),
      switchMap(([, userId]) => {
        return this.transactionService.getTransactionsForUser(userId).pipe(
          map((response) => {
            if (response.error) {
              return transactionActions.fetchTransactionsForUserFailure({
                message: response.error.message,
              });
            }

            return transactionActions.fetchTransactionsForUserSuccess({
              transactions: response.data.map((transaction) =>
                RaffleTransactionFactory.fromDto(
                  transaction,
                  RaffleTransactionType.UserPurchase
                )
              ),
            });
          }),
          catchError(() => {
            return of(
              transactionActions.fetchTransactionsForUserFailure({
                message: 'Failed to fetch transactions',
              })
            );
          })
        );
      })
    )
  );

  fetchTransactionsForUserManagedAthletes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(transactionActions.fetchTransactionsForUserManagedAthletes),
      withLatestFrom(
        this.store.select(userFeature.selectUserId).pipe(filter(isNotNil))
      ),
      switchMap(([, userId]) => {
        return this.transactionService
          .getTransactionsForUserManagedAthletes(userId)
          .pipe(
            map((response) => {
              if (response.error) {
                return transactionActions.fetchTransactionsForUserManagedAthletesFailure(
                  {
                    message: response.error.message,
                  }
                );
              }

              return transactionActions.fetchTransactionsForUserManagedAthletesSuccess(
                {
                  transactions: response.data.map((transaction) =>
                    RaffleTransactionFactory.fromDto(
                      transaction,
                      RaffleTransactionType.AthleteProfit
                    )
                  ),
                }
              );
            }),
            catchError(() => {
              return of(
                transactionActions.fetchTransactionsForUserManagedAthletesFailure(
                  {
                    message:
                      'Failed to fetch transactions for user managed athletes',
                  }
                )
              );
            })
          );
      })
    )
  );

  fetchTransactionSummaryForUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(transactionActions.fetchTransactionSummaryForUser),
      withLatestFrom(
        this.store.select(userFeature.selectUserId).pipe(filter(isNotNil))
      ),
      switchMap(([, userId]) => {
        return this.transactionService
          .getTransactionSummaryForUser(userId)
          .pipe(
            map((response) => {
              if (response.error) {
                return transactionActions.fetchTransactionSummaryForUserFailure(
                  { message: response.error.message }
                );
              }

              const transactionSummary =
                RaffleTransactionSummaryFactory.fromDto(response.data);

              if (transactionSummary === undefined) {
                return transactionActions.fetchTransactionSummaryForUserFailure(
                  { message: 'Transaction summary is invalid' }
                );
              }
              return transactionActions.fetchTransactionSummaryForUserSuccess({
                transactionSummary: transactionSummary,
              });
            }),
            catchError(() => {
              return of(
                transactionActions.fetchTransactionSummaryForUserFailure({
                  message: 'Failed to fetch transaction summary for user',
                })
              );
            })
          );
      })
    )
  );

  fetchRaffleSummaryForUserManagedAthletes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(transactionActions.fetchRaffleSummaryForUserManagedAthletes),
      withLatestFrom(
        this.store.select(userFeature.selectUserId).pipe(filter(isNotNil))
      ),
      switchMap(([, userId]) => {
        return this.transactionService
          .getProfileAthleteRaffleSummary(userId)
          .pipe(
            map((response) => {
              if (response.error) {
                return transactionActions.fetchRaffleSummaryForUserManagedAthletesFailure(
                  { message: response.error.message }
                );
              }

              const summary = UserManagedAthletesRaffleSummaryFactory.fromDto(
                response.data
              );

              if (summary === undefined) {
                return transactionActions.fetchRaffleSummaryForUserManagedAthletesFailure(
                  { message: 'User managed athletes summary is invalid' }
                );
              }
              return transactionActions.fetchRaffleSummaryForUserManagedAthletesSuccess(
                {
                  raffleSummary: summary,
                }
              );
            }),
            catchError(() => {
              return of(
                transactionActions.fetchRaffleSummaryForUserManagedAthletesFailure(
                  {
                    message:
                      'Failed to fetch raffle summary for user managed athletes',
                  }
                )
              );
            })
          );
      })
    )
  );

  fetchTransactionsForAthlete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(transactionActions.fetchTransactionsForAthlete),
      switchMap((action) => {
        return this.transactionService
          .getTransactionsForAthlete(action.athleteId)
          .pipe(
            map((response) => {
              if (response.error) {
                return transactionActions.fetchTransactionsForAthleteFailure({
                  athleteId: action.athleteId,
                  message: response.error.message,
                });
              }

              return transactionActions.fetchTransactionsForAthleteSuccess({
                athleteId: action.athleteId,
                transactions: response.data.map((transaction) =>
                  RaffleTransactionFactory.fromDto(
                    transaction,
                    RaffleTransactionType.AthleteProfit
                  )
                ),
              });
            }),
            catchError(() => {
              return of(
                transactionActions.fetchTransactionsForAthleteFailure({
                  athleteId: action.athleteId,
                  message: 'Failed to fetch athlete transactions',
                })
              );
            })
          );
      })
    )
  );

  fetchRaffleSummaryForAthlete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(transactionActions.fetchRaffleSummaryForAthlete),
      switchMap((action) => {
        return this.transactionService
          .getAthleteRaffleSummary(action.athleteId)
          .pipe(
            map((response) => {
              if (response.error) {
                return transactionActions.fetchRaffleSummaryForAthleteFailure({
                  athleteId: action.athleteId,
                  message: response.error.message,
                });
              }

              const athleteRaffleSummary = AthleteRaffleSummaryFactory.fromDto(
                response.data
              );

              if (athleteRaffleSummary === undefined) {
                return transactionActions.fetchRaffleSummaryForAthleteFailure({
                  athleteId: action.athleteId,
                  message: 'Athlete raffle summary is invalid',
                });
              }

              return transactionActions.fetchRaffleSummaryForAthleteSuccess({
                raffleSummary: athleteRaffleSummary,
              });
            }),
            catchError(() => {
              return of(
                transactionActions.fetchTransactionsForAthleteFailure({
                  athleteId: action.athleteId,
                  message: 'Failed to fetch athlete transactions',
                })
              );
            })
          );
      })
    )
  );
}
