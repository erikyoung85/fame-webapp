import { ProfileAthleteRaffleSummaryResponseDtoV1 } from '../services/transaction/dtos/responses/athlete-raffle-summary.response.dto.v1 copy';

export interface UserManagedAthletesRaffleSummary {
  profileId: string;
  rafflesCreated: number;
  rafflesCompleted: number;
  ticketsSold: number;
}

export class UserManagedAthletesRaffleSummaryFactory {
  static fromDto(
    dto: ProfileAthleteRaffleSummaryResponseDtoV1
  ): UserManagedAthletesRaffleSummary | undefined {
    if (dto.profile_id === null) {
      return undefined;
    }
    return {
      profileId: dto.profile_id,
      rafflesCreated: dto.total_raffles_created ?? 0,
      rafflesCompleted: dto.total_raffles_completed ?? 0,
      ticketsSold: dto.total_tickets_sold ?? 0,
    };
  }
}
