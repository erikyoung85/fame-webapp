import { Routes } from '@angular/router';

export enum AppRoutes {
  Home = 'home',
  Login = 'login',
  UserSignup = 'user-signup',
  PasswordReset = 'password-reset',
  UserProfile = 'user-profile',
}

export const routes: Routes = [
  {
    path: '',
    redirectTo: AppRoutes.Home,
    pathMatch: 'full',
  },
  {
    path: AppRoutes.Home,
    loadComponent: () =>
      import('./pages/home/home.page').then((m) => m.HomePage),
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
  {
    path: AppRoutes.UserProfile,
    loadComponent: () =>
      import('./pages/user-profile/user-profile.page').then(
        (m) => m.UserProfilePage
      ),
    loadChildren: () => import('./pages/user-profile/user-profile.routes'),
  },
];
