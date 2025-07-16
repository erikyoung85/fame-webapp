import { CurrencyPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonListHeader,
  IonRow,
  IonSkeletonText,
} from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import { AsyncDataStatus } from 'src/app/core/models/AsyncData.model';
import { transactionActions } from 'src/app/core/store/transaction/actions/transaction.actions';
import { transactionFeature } from 'src/app/core/store/transaction/feature/transaction.feature';
import { TransactionsListComponent } from '../transactions-list/transactions-list.component';

@Component({
  selector: 'app-athlete-transactions-view',
  templateUrl: './athlete-transactions-view.component.html',
  styleUrls: ['./athlete-transactions-view.component.scss'],
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
    CurrencyPipe,
    TransactionsListComponent,
  ],
})
export class AthleteTransactionsViewComponent implements OnInit {
  private readonly store = inject(Store);
  readonly LoadingStatus = AsyncDataStatus.Loading;

  readonly managedAthletesTransactions$ = this.store.selectSignal(
    transactionFeature.selectUserManagedAthletesTransactions
  );
  readonly managedAthletesRaffleSummary$ = this.store.selectSignal(
    transactionFeature.selectUserManagedAthletesRaffleSummary
  );

  ngOnInit(): void {
    this.store.dispatch(
      transactionActions.fetchTransactionsForUserManagedAthletes()
    );
    this.store.dispatch(
      transactionActions.fetchRaffleSummaryForUserManagedAthletes()
    );
  }
}
