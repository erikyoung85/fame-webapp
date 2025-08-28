export interface CreateRaffleRequestDtoV1 {
  id: string;
  athletes_id: number;
  title: string;
  description: string | null;
  start_date: string;
  end_date: string;
  prize_thumbnail: string;
  prize_video_url: string;
}
