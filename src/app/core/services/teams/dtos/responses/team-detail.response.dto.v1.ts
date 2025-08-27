import { Gender } from 'src/app/core/enums/Gender.enum';
import { Grade } from 'src/app/core/enums/Grade.enum';

export const SELECT_TEAM_DETAIL_V1 =
  'id, season_year, name, banner_url, logo_url, schools(id, name, abbreviation, city, state, logo_url), sports(id, name, gender), roster_entries(id, position, jersey_number, athletes(id, avatar_url, first_name, last_name, gender, grade))';

export interface TeamDetailResponseDtoV1 {
  id: number;
  season_year: number;
  name: string;
  banner_url: string | null;
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
  roster_entries: {
    id: number;
    jersey_number: number | null;
    position: string | null;
    athletes: {
      id: number;
      avatar_url: string | null;
      first_name: string;
      last_name: string;
      gender: keyof typeof Gender;
      grade: keyof typeof Grade;
    };
  }[];
}
