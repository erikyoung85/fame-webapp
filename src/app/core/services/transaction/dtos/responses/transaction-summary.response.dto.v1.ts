export const transactionSummarySelectStr = `profile_id, total_raffles_joined, total_tickets_purchased, total_raffles_won`;

export interface TransactionSummaryResponseDtoV1 {
  profile_id: string | null;
  total_raffles_joined: number | null;
  total_tickets_purchased: number | null;
  total_raffles_won: number | null;
}
