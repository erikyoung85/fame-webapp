import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonLabel,
  IonRefresher,
  IonRefresherContent,
  IonSegment,
  IonSegmentButton,
  IonSegmentContent,
  IonSegmentView,
  IonTitle,
  IonToolbar,
  RefresherCustomEvent,
} from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import { UserProfile } from 'src/app/core/models/UserProfile.model';
import { transactionActions } from 'src/app/core/store/transaction/actions/transaction.actions';
import { transactionFeature } from 'src/app/core/store/transaction/feature/transaction.feature';
import { AthleteTransactionsViewComponent } from './athlete-transactions-view/athlete-transactions-view.component';
import { UserTransactionsViewComponent } from './user-transactions-view/user-transactions-view.component';

@Component({
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    IonRefresherContent,
    IonRefresher,
    IonSegmentButton,
    IonSegment,
    IonLabel,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonContent,
    IonSegmentView,
    IonSegmentContent,
    UserTransactionsViewComponent,
    AthleteTransactionsViewComponent,
  ],
})
export class TransactionsPage {
  private readonly store = inject(Store);

  readonly userProfile = input.required<UserProfile>();

  readonly userTransactions$ = this.store.selectSignal(
    transactionFeature.selectTransactions
  );
  readonly userTransactionSummary$ = this.store.selectSignal(
    transactionFeature.selectTransactionSummary
  );
  readonly managedAthletesTransactions$ = this.store.selectSignal(
    transactionFeature.selectUserManagedAthletesTransactions
  );
  readonly managedAthletesRaffleSummary$ = this.store.selectSignal(
    transactionFeature.selectUserManagedAthletesRaffleSummary
  );

  constructor() {
    this.fetchAllData();
  }

  private fetchAllData() {
    this.store.dispatch(transactionActions.fetchTransactionsForUser());
    this.store.dispatch(transactionActions.fetchTransactionSummaryForUser());
    this.store.dispatch(
      transactionActions.fetchTransactionsForUserManagedAthletes()
    );
    this.store.dispatch(
      transactionActions.fetchRaffleSummaryForUserManagedAthletes()
    );
  }

  handleRefresh(event: RefresherCustomEvent) {
    this.fetchAllData();
    setTimeout(() => {
      event.detail.complete();
    }, 1000);
  }
}
