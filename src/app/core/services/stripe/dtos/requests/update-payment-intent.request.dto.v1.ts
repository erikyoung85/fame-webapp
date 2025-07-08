export interface UpdatePaymentIntentRequestDtoV1 {
  id: string;
  raffleId: number;
  customerId: string;
  amount: number;
  message: string;
}
