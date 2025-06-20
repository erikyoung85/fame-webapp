import { PageType } from '../enums/PageType.enum';

export interface PagePreview {
  type: PageType;
  id: number;
  title: string;
  description: string | undefined;
  avatarUrl: string | undefined;
}

export type AthletePagePreview = PagePreview & {
  type: PageType.Athlete;
};

export type TeamPagePreview = PagePreview & {
  type: PageType.Team;
};
