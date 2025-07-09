import { Routes } from '@angular/router';
import { FormActionRoutes } from 'src/app/app.routes';
import { UserProfileEditPage } from './user-profile-edit/user-profile-edit.page';
import { UserProfileViewPage } from './user-profile-view/user-profile-view.page';

export default [
  {
    path: '',
    redirectTo: FormActionRoutes.View,
    pathMatch: 'full',
  },
  {
    path: FormActionRoutes.View,
    component: UserProfileViewPage,
  },
  {
    path: FormActionRoutes.Edit,
    component: UserProfileEditPage,
  },
] satisfies Routes;
