export interface CreatePaymentIntentRequestDtoV1 {
  raffleId: string;
  customerId: string;
  amount: number;
  message: string;
}
