import { inject } from '@angular/core';
import { RedirectFunction } from '@angular/router';
import { ToastController } from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import { AppRoutes, TabRoutes } from 'src/app/app.routes';
import { userActions } from '../../store/user/actions/user.actions';

export const MagicLoginLinkRedirect: RedirectFunction = (route) => {
  const store = inject(Store);
  const toastController = inject(ToastController);

  const tokenHash: string | undefined = route.queryParams['token_hash'];
  const type: string | undefined = route.queryParams['type'];

  if (tokenHash === undefined || type === undefined) {
    toastController
      .create({
        message: 'Magic Link login failed.',
        position: 'bottom',
        color: 'danger',
        swipeGesture: 'vertical',
        duration: 2000,
      })
      .then((toast) => toast.present());

    return '/';
  }

  store.dispatch(userActions.loginWithMagicLink({ tokenHash }));
  return `${AppRoutes.Tabs}/${TabRoutes.Account}`;
};
