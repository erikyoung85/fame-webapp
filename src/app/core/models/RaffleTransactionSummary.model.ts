import { TransactionSummaryResponseDtoV1 } from '../services/transaction/dtos/responses/transaction-summary.response.dto.v1';

export interface RaffleTransactionSummary {
  profileId: string;
  rafflesJoined: number;
  rafflesWon: number;
  totalSpent: number;
}

export class RaffleTransactionSummaryFactory {
  static fromDto(
    dto: TransactionSummaryResponseDtoV1
  ): RaffleTransactionSummary | undefined {
    if (dto.profile_id === null) {
      return undefined;
    }
    return {
      profileId: dto.profile_id,
      rafflesJoined: dto.total_raffles_joined ?? 0,
      rafflesWon: dto.total_raffles_won ?? 0,
      totalSpent: dto.total_tickets_purchased ?? 0,
    };
  }
}
