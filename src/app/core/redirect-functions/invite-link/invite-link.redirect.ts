import { inject } from '@angular/core';
import { RedirectFunction } from '@angular/router';
import { ToastController } from '@ionic/angular/standalone';
import { AppRoutes, PageRoutes, TabRoutes } from 'src/app/app.routes';
import { InviteInfoDtoV1 } from '../../services/invite/dtos/invite-info.dto.v1';
import { InviteService } from '../../services/invite/invite.service';

export const InviteLinkRedirect: RedirectFunction = (route) => {
  const inviteService = inject(InviteService);
  const toastController = inject(ToastController);

  const inviteEmail: string | undefined = route.queryParams['email'];
  const inviteToken: string | undefined = route.queryParams['token'];

  if (inviteEmail === undefined || inviteToken === undefined) {
    toastController
      .create({
        message: 'Invalid invite link.',
        position: 'bottom',
        color: 'danger',
        swipeGesture: 'vertical',
        duration: 2000,
      })
      .then((toast) => toast.present());

    return '/';
  }

  const invite: InviteInfoDtoV1 = {
    email: inviteEmail,
    token: inviteToken,
  };
  inviteService.saveInviteInfo(invite);

  return `${AppRoutes.Tabs}/${TabRoutes.Account}/${PageRoutes.Register}`;
};
