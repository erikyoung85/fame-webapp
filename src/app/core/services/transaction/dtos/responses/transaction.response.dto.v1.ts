import {
  RaffleResponseDtoV1,
  raffleSelectStr,
} from '../../../raffle/dtos/responses/raffle.response.dto.v1';

export const transactionSelectStr = `id, profile_id, quantity, purchased_at, raffles(${raffleSelectStr})`;

export interface TransactionResponseDtoV1 {
  id: number;
  profile_id: string;
  quantity: number;
  purchased_at: string;
  raffles: RaffleResponseDtoV1;
}
