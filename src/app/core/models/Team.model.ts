import { TeamResponseDtoV1 } from '../services/teams/dtos/responses/team.response.dto.v1';

export interface Team {
  id: number;
  seasonYear: number;
  name: string;
  logoUrl: string | undefined;
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
    gender: string;
  };
}

export class TeamFactory {
  static fromDtoV1(dto: TeamResponseDtoV1): Team {
    return {
      id: dto.id,
      name: dto.name,
      seasonYear: dto.season_year,
      logoUrl: dto.logo_url ?? undefined,
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
        gender: dto.sports.gender,
      },
    };
  }
}
