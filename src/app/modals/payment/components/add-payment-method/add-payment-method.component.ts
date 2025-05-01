import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-add-payment-method',
  templateUrl: './add-payment-method.component.html',
  styleUrls: ['./add-payment-method.component.scss'],
  imports: [
    IonTitle,
    IonToolbar,
    IonButton,
    IonContent,
    IonHeader,
    RouterModule,
  ],
})
export class AddPaymentMethodComponent {
  constructor(private paymentService: PaymentService) {}

  async addCard() {
    await this.paymentService.addPaymentMethod();
    alert('Card added (mocked)');
  }
}
