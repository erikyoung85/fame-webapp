export interface Athlete {
  id: string;
  name: string;
  sport: string;
  team: string;
  profilePictureUrl: string | undefined;
  position: string;
  jerseyNumber: string;
  favorited: boolean;
}
