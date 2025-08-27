import { Gender } from 'src/app/core/enums/Gender.enum';
import { Grade } from 'src/app/core/enums/Grade.enum';

export const SELECT_ATHLETE_V1 =
  'id, avatar_url, first_name, last_name, date_of_birth, gender, grade, schools(id, name, abbreviation), roster_entries(id, jersey_number, position, teams(id, name, sports(id, name)))';

export interface AthleteResponseDtoV1 {
  id: number;
  avatar_url: string | null;
  first_name: string;
  last_name: string;
  date_of_birth: string | null;
  gender: keyof typeof Gender;
  grade: keyof typeof Grade;
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
