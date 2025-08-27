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
import { AsyncData, AsyncDataStatus } from 'src/app/core/async-data';
import { RaffleTransaction } from 'src/app/core/models/RaffleTransaction.model';
import { UserManagedAthletesRaffleSummary } from 'src/app/core/models/UserManagedAthletesRaffleSummary.model';
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
export class AthleteTransactionsViewComponent {
  readonly LoadingStatus = AsyncDataStatus.Loading;

  readonly transactions$ = input.required<AsyncData<RaffleTransaction[]>>({
    alias: 'transactions',
  });
  readonly raffleSummary$ = input.required<
    AsyncData<UserManagedAthletesRaffleSummary | undefined>
  >({ alias: 'raffleSummary' });
}
