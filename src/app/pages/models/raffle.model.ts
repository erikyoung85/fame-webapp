export interface Raffle {
  id: string;
  name: string;
  sport: string;
  team: string;
  athlete: string;
  description: string;
  favorited: boolean;
  startDate: Date;
  endDate: Date;
}
