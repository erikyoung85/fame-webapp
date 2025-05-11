import { PaymentIntentResponseDtoV1 } from '../services/stripe/dtos/responses/payment-intent.response.dto.v1';

export interface StripePaymentIntent {
  id: string;
  clientSecret: string;
  customerId: string;
  ephemeralKey: string;
  amount: number;
  description: string;
}

export class StripePaymentIntentFactory {
  static fromDtoV1(dto: PaymentIntentResponseDtoV1): StripePaymentIntent {
    const amountDollars = dto.amountCents / 100;

    return {
      id: dto.id,
      clientSecret: dto.clientSecret,
      customerId: dto.customerId,
      ephemeralKey: dto.ephemeralKey,
      amount: amountDollars,
      description: dto.description,
    };
  }
}
