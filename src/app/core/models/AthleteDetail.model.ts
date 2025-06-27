import { Gender } from '../enums/Gender.enum';
import { Grade } from '../enums/Grade.enum';
import { AthleteDetailResponseDtoV1 } from '../services/athletes/dtos/responses/athleteDetail.response.dto.v1';

export interface AthleteDetail {
  id: number;
  avatarUrl: string | undefined;
  bannerUrl: string | undefined;
  firstName: string;
  lastName: string;
  dateOfBirth: string | undefined;
  gender: Gender;
  position: string | undefined;
  jerseyNumber: number | undefined;
  schoolName: string | undefined;
  teamName: string | undefined;
  grade: Grade;
  hometown: string | undefined;
}

export class AthleteDetailFactory {
  static fromDtoV1(dto: AthleteDetailResponseDtoV1): AthleteDetail {
    return {
      id: dto.id,
      avatarUrl: dto.avatar_url ?? undefined,
      bannerUrl: dto.roster_entries[0]?.teams.banner_url ?? undefined,
      firstName: dto.first_name,
      lastName: dto.last_name,
      dateOfBirth: dto.date_of_birth ?? undefined,
      gender: Gender[dto.gender],
      position: dto.roster_entries[0]?.position ?? undefined,
      jerseyNumber: dto.roster_entries[0]?.jersey_number ?? undefined,
      schoolName: dto.schools?.name ?? undefined,
      teamName: dto.roster_entries[0]?.teams.name ?? undefined,
      grade: Grade[dto.grade],
      hometown: dto.hometown ?? undefined,
    };
  }
}
