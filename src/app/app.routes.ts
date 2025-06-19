import { Routes } from '@angular/router';
import { isLoggedInGuard } from './core/guards/is-logged-in/is-logged-in.guard';
import { isNotLoggedInGuard } from './core/guards/is-not-logged-in/is-not-logged-in.guard';
import { SessionGuard } from './core/guards/session/session.guard';
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

export enum FormActionRoutes {
  View = 'view',
  Edit = 'edit',
}

const athleteDetailPageRoutes: Routes = [
  {
    path: `${PageRoutes.AthleteDetail}/:athleteId`,
    redirectTo: `${PageRoutes.AthleteDetail}/:athleteId/${FormActionRoutes.View}`,
    pathMatch: 'full',
  },
  {
    path: `${PageRoutes.AthleteDetail}/:athleteId/${FormActionRoutes.View}`,
    loadComponent: () =>
      import(
        './pages/athlete-detail/athlete-detail-view/athlete-detail-view.page'
      ).then((m) => m.AthleteDetailViewPage),
  },
  {
    path: `${PageRoutes.AthleteDetail}/:athleteId/${FormActionRoutes.Edit}`,
    loadComponent: () =>
      import(
        './pages/athlete-detail/athlete-detail-edit/athlete-detail-edit.page'
      ).then((m) => m.AthleteDetailEditPage),
  },
];

export const routes: Routes = [
  {
    path: '',
    redirectTo: AppRoutes.Tabs,
    pathMatch: 'full',
  },
  {
    path: AppRoutes.Tabs,
    component: TabsPage,
    canActivate: [SessionGuard],
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
          ...athleteDetailPageRoutes,
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
          ...athleteDetailPageRoutes,
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
            canActivate: [isNotLoggedInGuard],
          },
          {
            path: PageRoutes.Register,
            loadComponent: () =>
              import('./pages/user-signup/user-signup.page').then(
                (m) => m.UserSignupPage
              ),
            canActivate: [isNotLoggedInGuard],
          },
          {
            path: PageRoutes.PasswordReset,
            loadComponent: () =>
              import('./pages/password-reset/password-reset.page').then(
                (m) => m.PasswordResetPage
              ),
            canActivate: [isNotLoggedInGuard],
          },
          ...athleteDetailPageRoutes,
        ],
      },
    ],
  },
];
