import { RaffleResponseDtoV1 } from '../services/raffle/dtos/responses/raffle.response.dto.v1';

export interface Raffle {
  id: number;
  title: string;
  description: string | undefined;
  startDate: string;
  expirationDate: string;
  sport: string;
  teamName: string;
  athlete: {
    id: number;
    name: string;
  };
  favorited: boolean;
}

export class RaffleFactory {
  static fromDtoV1(dto: RaffleResponseDtoV1): Raffle {
    return {
      id: dto.id,
      title: dto.title,
      description: dto.description ?? undefined,
      startDate: dto.start_date,
      expirationDate: dto.end_date,
      sport: dto.athletes.roster_entries[0]?.teams.sports.name ?? '',
      teamName: dto.athletes.roster_entries[0]?.teams.name ?? '',
      athlete: {
        id: dto.athletes.id,
        name: `${dto.athletes.first_name} ${dto.athletes.last_name}`,
      },
      favorited: false,
    };
  }
}
