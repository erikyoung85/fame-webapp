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
  selector: 'app-user-transactions-view',
  templateUrl: './user-transactions-view.component.html',
  styleUrls: ['./user-transactions-view.component.scss'],
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
export class UserTransactionsViewComponent implements OnInit {
  private readonly store = inject(Store);
  readonly LoadingStatus = AsyncDataStatus.Loading;

  readonly transactions$ = this.store.selectSignal(
    transactionFeature.selectTransactions
  );
  readonly transactionSummary$ = this.store.selectSignal(
    transactionFeature.selectTransactionSummary
  );

  ngOnInit(): void {
    this.store.dispatch(transactionActions.fetchTransactionsForUser());
    this.store.dispatch(transactionActions.fetchTransactionSummaryForUser());
  }
}
