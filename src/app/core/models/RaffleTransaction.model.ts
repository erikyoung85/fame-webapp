import { TransactionResponseDtoV1 } from '../services/transaction/dtos/responses/transaction.response.dto.v1';
import { Raffle, RaffleFactory } from './Raffle.model';

export enum RaffleTransactionType {
  UserPurchase = 'user-purchase',
  AthleteProfit = 'athlete-profit',
}

export interface RaffleTransaction {
  id: number;
  type: RaffleTransactionType;
  profileId: string;
  quantity: number;
  purchasedAt: string;
  raffle: Raffle;
}

export class RaffleTransactionFactory {
  static fromDto(
    dto: TransactionResponseDtoV1,
    type: RaffleTransactionType
  ): RaffleTransaction {
    return {
      id: dto.id,
      type: type,
      profileId: dto.profile_id,
      quantity: dto.quantity,
      purchasedAt: dto.purchased_at,
      raffle: RaffleFactory.fromDtoV1(dto.raffles),
    };
  }
}
