import { inject } from '@angular/core';
import { RedirectFunction } from '@angular/router';
import { ToastController } from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import { AppRoutes, TabRoutes } from 'src/app/app.routes';
import { userActions } from '../../store/user/actions/user.actions';

export const TokenLoginLinkRedirect: RedirectFunction = (route) => {
  const store = inject(Store);
  const toastController = inject(ToastController);

  const tokenHash: string | undefined = route.queryParams['token_hash'];
  const type: string | undefined = route.queryParams['type'];
  const redirectUrl: string | undefined = route.queryParams['redirect'];

  if (
    tokenHash === undefined ||
    type === undefined ||
    (type !== 'email' && type !== 'magiclink' && type !== 'recovery')
  ) {
    toastController
      .create({
        message: 'Invalid token login parameters.',
        position: 'bottom',
        color: 'danger',
        swipeGesture: 'vertical',
        duration: 2000,
      })
      .then((toast) => toast.present());

    return '/';
  }

  store.dispatch(
    userActions.loginWithTokenHash({
      tokenHash: tokenHash,
      otpType: type,
      // redirectUrl: redirectUrl ?? `${AppRoutes.Tabs}/${TabRoutes.Account}`,
    })
  );
  console.log('redirectUrl', redirectUrl);
  return redirectUrl ?? `${AppRoutes.Tabs}/${TabRoutes.Account}`;
};
