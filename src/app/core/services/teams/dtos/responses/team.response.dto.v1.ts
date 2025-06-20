export interface TeamResponseDtoV1 {
  id: number;
  season_year: number;
  name: string;
  logo_url: string | null;
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
}
