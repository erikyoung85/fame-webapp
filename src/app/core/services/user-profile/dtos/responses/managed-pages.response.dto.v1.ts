import {
  AthletePagePreview,
  RafflePreview,
  TeamPagePreview,
} from 'src/app/core/models/PagePreview.model';

export interface ManagedPagesResponseDtoV1 {
  athletes: AthletePagePreview[];
  teams: TeamPagePreview[];
  raffles: RafflePreview[];
}
