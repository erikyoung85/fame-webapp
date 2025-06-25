export interface RaffleResponseDtoV1 {
  id: number;
  title: string;
  description: string | null;
  start_date: string;
  end_date: string;
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
