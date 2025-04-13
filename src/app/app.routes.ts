import { Routes } from '@angular/router';

export enum AppRoutes {
  Login = 'login',
  UserSignup = 'user-signup',
  PasswordReset = 'password-reset',
  Folder = 'folder',
}

export const routes: Routes = [
  {
    path: '',
    redirectTo: `${AppRoutes.Folder}/inbox`,
    pathMatch: 'full',
  },
  {
    path: `${AppRoutes.Folder}/:id`,
    loadComponent: () =>
      import('./folder/folder.page').then((m) => m.FolderPage),
  },
  {
    path: AppRoutes.Login,
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: AppRoutes.UserSignup,
    loadComponent: () =>
      import('./pages/user-signup/user-signup.page').then(
        (m) => m.UserSignupPage
      ),
  },
  {
    path: AppRoutes.PasswordReset,
    loadComponent: () =>
      import('./pages/password-reset/password-reset.page').then(
        (m) => m.PasswordResetPage
      ),
  },
];
