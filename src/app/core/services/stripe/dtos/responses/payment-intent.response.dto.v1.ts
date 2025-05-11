export interface PaymentIntentResponseDtoV1 {
  id: string;
  clientSecret: string;
  customerId: string;
  ephemeralKey: string;
  amountCents: number;
  currency: string;
  description: string;
  metadata: { [key: string]: string };
}
