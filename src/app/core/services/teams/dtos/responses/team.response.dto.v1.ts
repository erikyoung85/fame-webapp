export interface TeamResponseDtoV1 {
  id: number;
  season_year: number;
  name: string;
  schools: {
    id: number;
    name: string;
    abbreviation: string | null;
    city: string;
    state: string;
  };
  sports: {
    id: number;
    name: string;
    gender: string;
  };
}
