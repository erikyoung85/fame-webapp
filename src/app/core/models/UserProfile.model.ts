import { AuthUser, Session } from '@supabase/supabase-js';
import { UserProfileResponseDtoV1 } from '../services/user-profile/dtos/responses/user-profile.response.dto.v1';

export interface UserProfile {
  id: string;
  avatarUrl: string | undefined;
  email: string;
  firstName: string;
  lastName: string;
  favoriteTeamId: number | undefined;
  isAthlete: boolean;
  isTeamManager: boolean;
  isAdmin: boolean;
}

export class UserProfileFactory {
  /** @deprecated  */
  static fromSupabaseUser(user: AuthUser): UserProfile {
    return {
      id: user.id,
      avatarUrl: undefined,
      email: user.email ?? '',
      firstName: user.user_metadata?.['first_name'] ?? '',
      lastName: user.user_metadata?.['last_name'] ?? '',
      favoriteTeamId: user.user_metadata?.['favorite_team_id'] ?? undefined,
      isAdmin: false,
      isAthlete: false,
      isTeamManager: false,
    };
  }

  static fromSessionAndProfileResponseDto(
    session: Session,
    userProfileDto: UserProfileResponseDtoV1
  ): UserProfile {
    return {
      id: session.user.id,
      avatarUrl: userProfileDto.avatar_url ?? undefined,
      email: session.user.email ?? '',
      firstName: userProfileDto.first_name,
      lastName: userProfileDto.last_name,
      favoriteTeamId: userProfileDto.favorite_team_id ?? undefined,
      isAdmin: userProfileDto.profiles_admin?.is_admin ?? false,
      isAthlete: userProfileDto.is_athlete,
      isTeamManager: userProfileDto.is_team_manager,
    };
  }
}
