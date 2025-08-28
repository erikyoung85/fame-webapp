import { PageType } from '../enums/PageType.enum';

export interface PagePreview {
  type: PageType;
  id: number | string;
  title: string;
  description: string | undefined;
  avatarUrl: string | undefined;
}

export type AthletePagePreview = PagePreview & {
  id: number;
  type: PageType.Athlete;
};

export type TeamPagePreview = PagePreview & {
  id: number;
  type: PageType.Team;
};

export type RafflePreview = PagePreview & {
  id: string;
  type: PageType.Raffle;
  endDate: string;
};
