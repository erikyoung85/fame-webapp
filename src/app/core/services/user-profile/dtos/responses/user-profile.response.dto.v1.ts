export interface UserProfileResponseDtoV1 {
  id: string;
  avatar_url: string | null;
  first_name: string;
  last_name: string;
  favorite_team_id: number | null;
  profiles_admin: {
    is_admin: boolean;
  } | null;
}
