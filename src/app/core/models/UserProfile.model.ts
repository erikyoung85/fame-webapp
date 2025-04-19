import { AuthUser, Session } from '@supabase/supabase-js';
import { UserProfileResponseDtoV1 } from '../services/user-profile/dtos/responses/user-profile.response.dto.v1';

export interface UserProfile {
  authUser?: AuthUser;

  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export class UserProfileFactory {
  /** @deprecated  */
  static fromSupabaseUser(user: AuthUser): UserProfile {
    return {
      id: user.id,
      email: user.email ?? '',
      firstName: user.user_metadata?.['first_name'] ?? '',
      lastName: user.user_metadata?.['last_name'] ?? '',
    };
  }

  static fromSessionAndProfileResponseDto(
    session: Session,
    userProfileDto: UserProfileResponseDtoV1
  ): UserProfile {
    return {
      id: session.user.id,
      email: session.user.email ?? '',
      firstName: userProfileDto.first_name,
      lastName: userProfileDto.last_name,
    };
  }
}
