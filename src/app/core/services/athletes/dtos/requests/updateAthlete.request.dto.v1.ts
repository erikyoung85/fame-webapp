import { Gender } from 'src/app/core/enums/Gender.enum';
import { Grade } from 'src/app/core/enums/Grade.enum';

export interface UpdateAthleteRequestDtoV1 {
  id: number;
  avatar_url: string | null;
  first_name: string;
  last_name: string;
  date_of_birth: string | null;
  gender: keyof typeof Gender;
  grade: keyof typeof Grade;
  hometown: string | null;
}
