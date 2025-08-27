export const SELECT_TEAM_V1 =
  'id, season_year, name, logo_url, schools(id, name, abbreviation, city, state, logo_url), sports(id, name, gender)';

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
