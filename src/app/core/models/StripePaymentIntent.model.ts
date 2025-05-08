import { CreatePaymentIntentResponseDtoV1 } from '../services/stripe/dtos/responses/create-payment-intent.response.dto.v1';

export interface StripePaymentIntent {
  clientSecret: string;
  customerId: string;
  ephemeralKey: string;
}

export class StripePaymentIntentFactory {
  static fromDtoV1(dto: CreatePaymentIntentResponseDtoV1): StripePaymentIntent {
    return {
      clientSecret: dto.clientSecret,
      customerId: dto.customerId,
      ephemeralKey: dto.ephemeralKey,
    };
  }
}
