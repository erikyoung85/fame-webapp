export interface UpdatePaymentIntentRequestDtoV1 {
  id: string;
  raffleId: string;
  customerId: string;
  amount: number;
  message: string;
}
