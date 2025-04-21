export interface TeamDetailResponseDtoV1 {
  id: number;
  season_year: number;
  name: string;
  schools: {
    id: number;
    name: string;
    abbreviation: string | null;
    city: string;
    state: string;
    logo_url: string | null;
  };
  sports: {
    id: number;
    name: string;
    gender: string;
  };
  roster_entries: {
    id: number;
    jersey_number: number | null;
    position: string | null;
    athletes: {
      id: number;
      first_name: string;
      last_name: string;
      gender: string;
    };
  }[];
}
