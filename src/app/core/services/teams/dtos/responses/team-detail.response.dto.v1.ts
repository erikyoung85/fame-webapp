import { Gender } from 'src/app/core/enums/Gender.enum';
import { Grade } from 'src/app/core/enums/Grade.enum';

export interface TeamDetailResponseDtoV1 {
  id: number;
  season_year: number;
  name: string;
  banner_url: string | null;
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
      gender: keyof typeof Gender;
      grade: keyof typeof Grade;
    };
  }[];
}
