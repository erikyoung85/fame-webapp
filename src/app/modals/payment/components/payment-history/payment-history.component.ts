import { DatePipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.scss'],
  imports: [
    IonLabel,
    IonItem,
    IonList,
    IonContent,
    IonTitle,
    IonToolbar,
    IonHeader,
    DatePipe,
    NgFor,
    RouterModule,
  ],
})
export class PaymentHistoryComponent {
  history = [
    { to: 'Alice', amount: 500, date: new Date() },
    { to: 'Bob', amount: 2000, date: new Date() },
  ];
}
