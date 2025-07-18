import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { InviteInfoDtoV1 } from 'src/app/core/services/invite/dtos/invite-info.dto.v1';
import { AcceptInviteResponseDtoV1 } from 'src/app/core/services/invite/dtos/responses/accept-invite.response.dto.v1';

export const inviteActions = createActionGroup({
  source: 'Invite',
  events: {
    'Check Process Invite': emptyProps(),
    'No Invite Found': emptyProps(),

    'Accept Invite': props<{ invite: InviteInfoDtoV1 }>(),
    'Accept Invite Success': props<{
      acceptedInvite: AcceptInviteResponseDtoV1;
    }>(),
    'Accept Invite Failure': props<{ message: string }>(),
  },
});
