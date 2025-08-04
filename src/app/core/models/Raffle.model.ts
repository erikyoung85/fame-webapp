import {
  FilePickerFile,
  FilePickerFileType,
  FilePickerFileUrlType,
} from 'src/app/shared/components/form-file-picker/form-file-picker.component';
import { RaffleResponseDtoV1 } from '../services/raffle/dtos/responses/raffle.response.dto.v1';

export interface Raffle {
  id: number;
  title: string;
  description: string | undefined;
  startDate: string;
  endDate: string;
  sport: string;
  teamName: string;
  prizeThumbnail: string;
  prizeVideo: FilePickerFile;
  athlete: {
    id: number;
    name: string;
  };
  favorited: boolean;
}

export class RaffleFactory {
  static fromDtoV1(dto: RaffleResponseDtoV1): Raffle {
    return {
      id: dto.id,
      title: dto.title,
      description: dto.description ?? undefined,
      startDate: dto.start_date,
      endDate: dto.end_date,
      sport: dto.athletes.roster_entries[0]?.teams.sports.name ?? '',
      teamName: dto.athletes.roster_entries[0]?.teams.name ?? '',
      prizeThumbnail: dto.prize_thumbnail,
      prizeVideo: {
        name: dto.prize_video_url.split('/').pop() ?? '',
        url: dto.prize_video_url,
        urlType: FilePickerFileUrlType.External,
        type: FilePickerFileType.Video,
      },
      athlete: {
        id: dto.athletes.id,
        name: `${dto.athletes.first_name} ${dto.athletes.last_name}`,
      },
      favorited: false,
    };
  }
}
