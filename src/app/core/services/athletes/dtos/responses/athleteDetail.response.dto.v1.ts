export interface AthleteDetailResponseDtoV1 {
  id: number;
  first_name: string;
  last_name: string;
  date_of_birth: string | null;
  gender: string;
  schools: {
    id: number;
    name: string;
    abbreviation: string | null;
  } | null;
  roster_entries: {
    id: number;
    jersey_number: number | null;
    position: string | null;
    teams: {
      id: number;
      name: string;
      sports: {
        id: number;
        name: string;
      };
    };
  }[];
}
