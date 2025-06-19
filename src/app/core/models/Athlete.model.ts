import { Gender } from '../enums/Gender.enum';
import { Grade } from '../enums/Grade.enum';
import { AthleteResponseDtoV1 } from '../services/athletes/dtos/responses/athletes.response.dto.v1';

export interface Athlete {
  id: number;
  avatarUrl: string | undefined;
  firstName: string;
  lastName: string;
  dateOfBirth: string | undefined;
  gender: Gender;
  position: string | undefined;
  jerseyNumber: number | undefined;
  schoolName: string | undefined;
  teamName: string | undefined;
  grade: Grade;
}

export class AthleteFactory {
  static fromDtoV1(dto: AthleteResponseDtoV1): Athlete {
    return {
      id: dto.id,
      avatarUrl: dto.avatar_url ?? undefined,
      firstName: dto.first_name,
      lastName: dto.last_name,
      dateOfBirth: dto.date_of_birth ?? undefined,
      gender: Gender[dto.gender],
      position: dto.roster_entries[0]?.position ?? undefined,
      jerseyNumber: dto.roster_entries[0]?.jersey_number ?? undefined,
      schoolName: dto.schools?.name ?? undefined,
      teamName: dto.roster_entries[0]?.teams.name ?? undefined,
      grade: Grade[dto.grade],
    };
  }
}
