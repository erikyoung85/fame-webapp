import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
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
import {
  AsyncData,
  AsyncDataStatus,
} from 'src/app/core/models/AsyncData.model';
import { RaffleTransaction } from 'src/app/core/models/RaffleTransaction.model';
import { RaffleTransactionSummary } from 'src/app/core/models/RaffleTransactionSummary.model';
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
export class UserTransactionsViewComponent {
  readonly LoadingStatus = AsyncDataStatus.Loading;

  readonly transactions$ = input.required<AsyncData<RaffleTransaction[]>>({
    alias: 'transactions',
  });
  readonly transactionSummary$ = input.required<
    AsyncData<RaffleTransactionSummary | undefined>
  >({ alias: 'transactionSummary' });
}
