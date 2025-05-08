import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonButton, IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-add-payment-method',
  templateUrl: './add-payment-method.component.html',
  styleUrls: ['./add-payment-method.component.scss'],
  imports: [
    IonButton,
    IonContent,
    RouterModule,
    ReactiveFormsModule,
    // StripeElementsDirective,
    // StripePaymentElementComponent,
    // StripeExpressCheckoutComponent,
  ],
})
export class AddPaymentMethodComponent {
  async addCard() {
    // this.elements.submit().subscribe((response) => {
    //   console.log('Stripe Elements Submit Response: ', response);
    // });
  }
}
