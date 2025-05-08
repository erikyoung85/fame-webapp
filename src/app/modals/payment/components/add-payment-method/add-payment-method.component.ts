import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonButton, IonContent } from '@ionic/angular/standalone';
import { take } from 'rxjs';
import { StripeApiService } from 'src/app/core/services/stripe/stripe-api.service';
import { StripeService } from 'src/app/core/services/stripe/stripe.service';

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
  private readonly stripeApiService = inject(StripeApiService);
  private readonly stripeService = inject(StripeService);

  async addCard() {
    this.stripeApiService
      .createPaymentIntent({
        amount: 2000,
      })
      .pipe(take(1))
      .subscribe(async (response) => {
        await this.stripeService.createPaymentSheet({
          paymentIntentClientSecret: response.clientSecret,
          customerId: response.customerId,
          customerEphemeralKeySecret: response.ephemeralKey,
        });
      });

    // this.elements.submit().subscribe((response) => {
    //   console.log('Stripe Elements Submit Response: ', response);
    // });
  }
}
