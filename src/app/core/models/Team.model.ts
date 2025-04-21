import { TeamResponseDtoV1 } from '../services/teams/dtos/responses/team.response.dto.v1';

export interface Team {
  id: number;
  season_year: number;
  name: string;
  school: {
    id: number;
    name: string;
    abbreviation: string | undefined;
    city: string;
    state: string;
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
      season_year: dto.season_year,
      school: {
        id: dto.schools.id,
        name: dto.schools.name,
        abbreviation: dto.schools.abbreviation ?? undefined,
        city: dto.schools.city,
        state: dto.schools.state,
      },
      sport: {
        id: dto.sports.id,
        name: dto.sports.name,
        gender: dto.sports.gender,
      },
    };
  }
}
