import { Routes } from '@angular/router';
import { isLoggedInGuard } from './core/guards/is-logged-in/is-logged-in.guard';
import { favoriteTeamResolver } from './core/resolvers/favorite-team/favorite-team.resolver';
import { sessionResolver } from './core/resolvers/session/session.resolver';
import { TabsPage } from './pages/tabs/tabs.page';

export enum AppRoutes {
  Tabs = 'tabs',
}

export enum TabRoutes {
  MyTeam = 'my-team',
  Search = 'search',
  Account = 'account',
}

export enum PageRoutes {
  Home = 'home',
  TeamDetail = 'team-detail',
  UserProfile = 'user-profile',
  Login = 'login',
  Register = 'register',
  PasswordReset = 'password-reset',
  Search = 'search',
  Payment = 'payment',
}

export const routes: Routes = [
  {
    path: '',
    redirectTo: AppRoutes.Tabs,
    pathMatch: 'full',
  },
  {
    path: AppRoutes.Tabs,
    component: TabsPage,
    resolve: {
      session: sessionResolver,
      // userProfile: userProfileResolver,
      favoriteTeam: favoriteTeamResolver,
    },
    children: [
      {
        path: '',
        redirectTo: TabRoutes.MyTeam,
        pathMatch: 'full',
      },
      {
        path: TabRoutes.MyTeam,
        children: [
          {
            path: '',
            redirectTo: PageRoutes.TeamDetail,
            pathMatch: 'full',
          },
          {
            path: PageRoutes.Home,
            loadComponent: () =>
              import('./pages/home/home.page').then((m) => m.HomePage),
          },
          {
            path: PageRoutes.TeamDetail,
            loadComponent: () =>
              import('./pages/favorite-team/favorite-team.page').then(
                (m) => m.FavoriteTeamPage
              ),
            data: {
              teamId: 1,
            },
          },
        ],
      },
      {
        path: TabRoutes.Search,
        children: [
          {
            path: '',
            redirectTo: PageRoutes.Search,
            pathMatch: 'full',
          },
          {
            path: PageRoutes.Search,
            loadComponent: () =>
              import('./pages/search/search.page').then((m) => m.SearchPage),
          },
          {
            path: `${PageRoutes.TeamDetail}/:teamId`,
            loadComponent: () =>
              import('./pages/team-detail/team-detail.page').then(
                (m) => m.TeamDetailPage
              ),
          },
        ],
      },
      {
        path: TabRoutes.Account,
        children: [
          {
            path: '',
            redirectTo: PageRoutes.UserProfile,
            pathMatch: 'full',
          },
          {
            path: PageRoutes.UserProfile,
            loadComponent: () =>
              import('./pages/user-profile/user-profile.page').then(
                (m) => m.UserProfilePage
              ),
            loadChildren: () =>
              import('./pages/user-profile/user-profile.routes'),
            canActivate: [isLoggedInGuard],
          },
          {
            path: PageRoutes.Login,
            loadComponent: () =>
              import('./pages/login/login.page').then((m) => m.LoginPage),
          },
          {
            path: PageRoutes.Register,
            loadComponent: () =>
              import('./pages/user-signup/user-signup.page').then(
                (m) => m.UserSignupPage
              ),
          },
          {
            path: PageRoutes.PasswordReset,
            loadComponent: () =>
              import('./pages/password-reset/password-reset.page').then(
                (m) => m.PasswordResetPage
              ),
          },
        ],
      },
    ],
  },
];
