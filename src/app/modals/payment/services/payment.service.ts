import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private router: Router) {}

  async sendPayment(toUserId: string, amount: number) {
    console.log(`Sending $${amount} to user ${toUserId}`);

    // Later: Call Supabase Function to create a Stripe PaymentIntent
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Mock API delay

    this.router.navigate(['/payment-success']);
  }

  async addPaymentMethod() {
    console.log('Adding a new payment method...');
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Mock API delay
  }
}
