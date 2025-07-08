export interface CreatePaymentIntentRequestDtoV1 {
  raffleId: number;
  customerId: string;
  amount: number;
  message: string;
}
