export interface UserProfileResponseDtoV1 {
  id: string;
  avatar_url: string | null;
  first_name: string;
  last_name: string;
  favorite_team_id: number | null;
  is_athlete: boolean;
  is_team_manager: boolean;
  profiles_admin: {
    is_admin: boolean;
  } | null;
}
