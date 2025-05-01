import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss'],
  imports: [
    IonButton,
    IonContent,
    IonTitle,
    IonToolbar,
    IonHeader,
    RouterModule,
  ],
})
export class PaymentSuccessComponent {}
