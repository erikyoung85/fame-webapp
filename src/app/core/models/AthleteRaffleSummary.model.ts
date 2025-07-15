import { AthleteRaffleSummaryResponseDtoV1 } from '../services/transaction/dtos/responses/athlete-raffle-summary.response.dto.v1';

export interface AthleteRaffleSummary {
  athleteId: number;
  rafflesCreated: number;
  rafflesCompleted: number;
  ticketsSold: number;
}

export class AthleteRaffleSummaryFactory {
  static fromDto(
    dto: AthleteRaffleSummaryResponseDtoV1
  ): AthleteRaffleSummary | undefined {
    if (dto.athlete_id === null) {
      return undefined;
    }
    return {
      athleteId: dto.athlete_id,
      rafflesCreated: dto.total_raffles_created ?? 0,
      rafflesCompleted: dto.total_raffles_completed ?? 0,
      ticketsSold: dto.total_tickets_sold ?? 0,
    };
  }
}
