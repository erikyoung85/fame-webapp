import { CurrencyPipe, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonSkeletonText,
  IonText,
} from '@ionic/angular/standalone';
import {
  RaffleTransaction,
  RaffleTransactionType,
} from 'src/app/core/models/RaffleTransaction.model';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    IonSkeletonText,
    IonLabel,
    IonItem,
    IonList,
    IonNote,
    IonText,
    NgFor,
    CurrencyPipe,
  ],
})
export class TransactionsListComponent {
  TransactionType = RaffleTransactionType;

  readonly transactions = input.required<RaffleTransaction[]>();
  readonly isLoading = input<boolean>(false);

  onTransactionClicked(): void {}
}
