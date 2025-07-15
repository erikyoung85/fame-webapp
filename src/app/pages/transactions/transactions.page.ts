import { CurrencyPipe, NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
} from '@angular/core';
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
  IonRow,
  IonSkeletonText,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import { AsyncDataStatus } from 'src/app/core/models/AsyncData.model';
import { RaffleTransactionType } from 'src/app/core/models/RaffleTransaction.model';
import { UserProfile } from 'src/app/core/models/UserProfile.model';
import { transactionActions } from 'src/app/core/store/transaction/actions/transaction.actions';
import { transactionFeature } from 'src/app/core/store/transaction/feature/transaction.feature';

@Component({
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    IonCardSubtitle,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonCol,
    IonRow,
    IonGrid,
    IonSkeletonText,
    IonListHeader,
    IonLabel,
    IonItem,
    IonList,
    IonNote,
    IonText,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonContent,
    NgFor,
    CurrencyPipe,
  ],
})
export class TransactionsPage implements OnInit {
  private readonly store = inject(Store);
  readonly LoadingStatus = AsyncDataStatus.Loading;
  readonly TransactionType = RaffleTransactionType;

  readonly userProfile = input.required<UserProfile>();

  readonly transactions$ = this.store.selectSignal(
    transactionFeature.selectTransactions
  );
  readonly transactionSummary$ = this.store.selectSignal(
    transactionFeature.selectTransactionSummary
  );
  readonly managedAthletesRaffleSummary$ = this.store.selectSignal(
    transactionFeature.selectUserManagedAthletesRaffleSummary
  );

  ngOnInit(): void {
    this.store.dispatch(transactionActions.fetchTransactionsForUser());
    this.store.dispatch(transactionActions.fetchTransactionSummaryForUser());
    if (this.userProfile().isAthlete) {
      this.store.dispatch(
        transactionActions.fetchRaffleSummaryForUserManagedAthletes()
      );
    }
  }

  onTransactionClicked(): void {}
}
