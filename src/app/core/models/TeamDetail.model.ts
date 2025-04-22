import { Gender } from '../enums/Gender.enum';
import { SchoolYear } from '../enums/SchoolYear.enum';
import { TeamDetailResponseDtoV1 } from '../services/teams/dtos/responses/team-detail.response.dto.v1';

export interface TeamDetail {
  id: number;
  seasonYear: number;
  name: string;
  school: {
    id: number;
    name: string;
    abbreviation: string | undefined;
    city: string;
    state: string;
    logoUrl: string | undefined;
  };
  sport: {
    id: number;
    name: string;
    gender: Gender;
  };
  rosterAthletes: {
    id: number;
    firstName: string;
    lastName: string;
    gender: Gender;
    position: string | undefined;
    jerseyNumber: number | undefined;
    schoolYear: SchoolYear;
  }[];
}

export class TeamDetailFactory {
  static fromDtoV1(dto: TeamDetailResponseDtoV1): TeamDetail {
    return {
      id: dto.id,
      name: dto.name,
      seasonYear: dto.season_year,
      school: {
        id: dto.schools.id,
        name: dto.schools.name,
        abbreviation: dto.schools.abbreviation ?? undefined,
        city: dto.schools.city,
        state: dto.schools.state,
        logoUrl: dto.schools.logo_url ?? undefined,
      },
      sport: {
        id: dto.sports.id,
        name: dto.sports.name,
        gender: dto.sports.gender === 'Male' ? Gender.Male : Gender.Female,
      },
      rosterAthletes: dto.roster_entries.map((athlete) => ({
        id: athlete.athletes.id,
        firstName: athlete.athletes.first_name,
        lastName: athlete.athletes.last_name,
        gender:
          athlete.athletes.gender === 'Male' ? Gender.Male : Gender.Female,
        position: athlete.position ?? undefined,
        jerseyNumber: athlete.jersey_number ?? undefined,
        schoolYear: SchoolYear.Junior, // TODO: Map to actual school year
      })),
    };
  }
}
