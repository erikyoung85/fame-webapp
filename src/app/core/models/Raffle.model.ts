import { isAfter } from 'date-fns';
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
  isStarted: boolean;
  isEnded: boolean;
  isActive: boolean;
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
    const now = new Date();
    const isStarted = isAfter(now, dto.start_date);
    const isEnded = isAfter(now, dto.end_date);
    const isActive = isStarted && !isEnded;
    return {
      id: dto.id,
      title: dto.title,
      description: dto.description ?? undefined,
      startDate: dto.start_date,
      endDate: dto.end_date,
      isStarted: isStarted,
      isEnded: isEnded,
      isActive: isActive,
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
