import { StripeCustomerResponseDtoV1 } from '../services/stripe/dtos/responses/stripe-customer.response.dto.v1';

export interface StripeCustomer {
  id: string;
}

export class StripeCustomerFactory {
  static fromDtoV1(dto: StripeCustomerResponseDtoV1): StripeCustomer {
    return {
      id: dto.customerId,
    };
  }
}
