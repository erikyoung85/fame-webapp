import { Injectable } from '@angular/core';
import {
  PaymentSheetResultInterface,
  Stripe,
  StripePlugin,
} from '@capacitor-community/stripe';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  private stripe: StripePlugin | undefined;

  constructor() {
    this.initializeStripe();
  }

  private async initializeStripe() {
    return Stripe.initialize({
      publishableKey: environment.stripe.publishableKey,
    })
      .then(() => (this.stripe = Stripe))
      .catch((error) => {
        this.stripe = undefined;
        console.error('Error initializing Stripe:', error);
      });
  }

  async createPaymentSheet(options: {
    paymentIntentClientSecret: string;
    customerId: string;
    customerEphemeralKeySecret: string;
  }): Promise<PaymentSheetResultInterface | undefined> {
    if (this.stripe === undefined) {
      console.error('Stripe is not initialized');
      return;
    }

    await this.stripe
      .createPaymentSheet({
        paymentIntentClientSecret: options.paymentIntentClientSecret,
        customerId: options.customerId,
        customerEphemeralKeySecret: options.customerEphemeralKeySecret,
        merchantDisplayName: 'FAME Sports LLC',
        enableApplePay: true,
        applePayMerchantId: environment.applePay.merchantId,
      })
      .catch((error) => {
        console.error('Error creating payment sheet:', error);
      });

    const result = await this.stripe.presentPaymentSheet().catch((error) => {
      console.error('Error presenting payment sheet:', error);
      return;
    });

    if (result === undefined) {
      console.error('Payment sheet was not presented');
      return;
    }

    return result.paymentResult;
  }
}
