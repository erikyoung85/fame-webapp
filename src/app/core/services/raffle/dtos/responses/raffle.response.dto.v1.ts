export const raffleSelectStr =
  'id, title, description, start_date, end_date, prize_thumbnail, athletes(id, first_name, last_name, profiles_x_athletes(), roster_entries(teams(id, name, sports(id, name))))';

export interface RaffleResponseDtoV1 {
  id: number;
  title: string;
  description: string | null;
  start_date: string;
  end_date: string;
  prize_thumbnail: string;
  athletes: {
    id: number;
    first_name: string;
    last_name: string;
    roster_entries: {
      teams: {
        id: number;
        name: string;
        sports: {
          id: number;
          name: string;
        };
      };
    }[];
  };
}
