import { Route, Routes } from '@angular/router';
import { isLoggedInGuard } from './core/guards/is-logged-in/is-logged-in.guard';
import { isNotLoggedInGuard } from './core/guards/is-not-logged-in/is-not-logged-in.guard';
import { SessionGuard } from './core/guards/session/session.guard';
import { InviteLinkRedirect } from './core/redirect-functions/invite-link/invite-link.redirect';
import { TokenLoginLinkRedirect } from './core/redirect-functions/token-login/token-login.redirect';
import { favoriteTeamResolver } from './core/resolvers/favorite-team/favorite-team.resolver';
import { sessionResolver } from './core/resolvers/session/session.resolver';
import { userProfileResolver } from './core/resolvers/user-profile/user-profile.resolver';
import { TabsPage } from './pages/tabs/tabs.page';

export enum AppRoutes {
  Invite = 'invite',
  AuthTokenLogin = 'auth/token-login',
  ResetPassword = 'auth/reset-password',
  Tabs = 'tabs',
}

export enum TabRoutes {
  MyTeam = 'my-team',
  Search = 'search',
  Transactions = 'transactions',
  Account = 'account',
}

export enum PageRoutes {
  TeamDetail = 'team-detail',
  AthleteDetail = 'athlete-detail',
  RaffleDetail = 'raffle-detail',
  UserProfile = 'user-profile',
  Login = 'login',
  Register = 'register',
  ForgotPassword = 'forgot-password',
  Search = 'search',
  Payment = 'payment',
  Transactions = 'transactions',
}

export enum FormActionRoutes {
  View = 'view',
  Edit = 'edit',
}

const athleteDetailPageRoute: Route = {
  path: `${PageRoutes.AthleteDetail}/:athleteId`,
  loadChildren: () => import('./pages/athlete-detail/athlete-detail.routes'),
};

const teamDetailPageRoute: Route = {
  path: `${PageRoutes.TeamDetail}/:teamId`,
  loadChildren: () => import('./pages/team-detail/team-detail.routes'),
};

const raffleDetailPageRoute: Route = {
  path: `${PageRoutes.RaffleDetail}/:raffleId`,
  loadChildren: () => import('./pages/raffle-detail/raffle-detail.routes'),
};

const userProfilePageRoute: Route = {
  path: PageRoutes.UserProfile,
  loadChildren: () => import('./pages/user-profile/user-profile.routes'),
  canActivate: [isLoggedInGuard],
};

export const routes: Routes = [
  {
    path: '',
    redirectTo: AppRoutes.Tabs,
    pathMatch: 'full',
  },
  {
    path: AppRoutes.Invite,
    redirectTo: InviteLinkRedirect,
    pathMatch: 'full',
  },
  {
    path: AppRoutes.ResetPassword,
    pathMatch: 'full',
    canActivate: [isLoggedInGuard],
    loadComponent: () =>
      import('./pages/reset-password/reset-password.page').then(
        (m) => m.ResetPasswordPage
      ),
  },
  {
    path: AppRoutes.AuthTokenLogin,
    redirectTo: TokenLoginLinkRedirect,
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
          athleteDetailPageRoute,
          raffleDetailPageRoute,
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
          teamDetailPageRoute,
          athleteDetailPageRoute,
          raffleDetailPageRoute,
        ],
      },
      {
        path: TabRoutes.Transactions,
        canActivate: [isLoggedInGuard],
        children: [
          {
            path: '',
            redirectTo: PageRoutes.Transactions,
            pathMatch: 'full',
          },
          {
            path: PageRoutes.Transactions,
            loadComponent: () =>
              import('./pages/transactions/transactions.page').then(
                (m) => m.TransactionsPage
              ),
            resolve: {
              userProfile: userProfileResolver,
            },
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
          userProfilePageRoute,
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
            path: PageRoutes.ForgotPassword,
            loadComponent: () =>
              import('./pages/forgot-password/forgot-password.page').then(
                (m) => m.ForgotPasswordPage
              ),
            canActivate: [isNotLoggedInGuard],
          },
          teamDetailPageRoute,
          athleteDetailPageRoute,
          raffleDetailPageRoute,
        ],
      },
    ],
  },
];
