import { Route, Routes } from '@angular/router';
import { isLoggedInGuard } from './core/guards/is-logged-in/is-logged-in.guard';
import { favoriteTeamResolver } from './core/resolvers/favorite-team/favorite-team.resolver';
import { sessionResolver } from './core/resolvers/session/session.resolver';
import { userProfileResolver } from './core/resolvers/user-profile/user-profile.resolver';
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
  TeamDetail = 'team-detail',
  AthleteDetail = 'athlete-detail',
  UserProfile = 'user-profile',
  Login = 'login',
  Register = 'register',
  PasswordReset = 'password-reset',
  Search = 'search',
  Payment = 'payment',
}

const athleteDetailPageRoute: Route = {
  path: `${PageRoutes.AthleteDetail}/:athleteId`,
  loadComponent: () =>
    import('./pages/athlete-detail/athlete-detail.page').then(
      (m) => m.AthleteDetailPage
    ),
};

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
      userProfile: userProfileResolver,
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
            path: PageRoutes.TeamDetail,
            loadComponent: () =>
              import('./pages/favorite-team/favorite-team.page').then(
                (m) => m.FavoriteTeamPage
              ),
          },
          athleteDetailPageRoute,
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
          athleteDetailPageRoute,
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
