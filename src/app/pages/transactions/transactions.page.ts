import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonSegmentContent,
  IonSegmentView,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { UserProfile } from 'src/app/core/models/UserProfile.model';
import { AthleteTransactionsViewComponent } from './athlete-transactions-view/athlete-transactions-view.component';
import { UserTransactionsViewComponent } from './user-transactions-view/user-transactions-view.component';

@Component({
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
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
  readonly userProfile = input.required<UserProfile>();
}
