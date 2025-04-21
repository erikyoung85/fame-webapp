import { AthleteResponseDtoV1 } from '../services/athletes/dtos/responses/athletes.response.dto.v1';

export interface Athlete {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string | undefined;
  gender: string;
  position: string | undefined;
  jerseyNumber: number | undefined;
  schoolName: string | undefined;
  teamName: string | undefined;
}

export class AthleteFactory {
  static fromDtoV1(dto: AthleteResponseDtoV1): Athlete {
    const rosterEntry = dto.roster_entries[0];
    return {
      id: dto.id,
      firstName: dto.first_name,
      lastName: dto.last_name,
      dateOfBirth: dto.date_of_birth ?? undefined,
      gender: dto.gender,
      position: dto.roster_entries[0]?.position ?? undefined,
      jerseyNumber: dto.roster_entries[0]?.jersey_number ?? undefined,
      schoolName: dto.schools?.name ?? undefined,
      teamName: dto.roster_entries[0]?.teams.name ?? undefined,
    };
  }
}
