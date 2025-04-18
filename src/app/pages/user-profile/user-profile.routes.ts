import { Routes } from '@angular/router';
import { UserProfileEditComponent } from './user-profile-edit/user-profile-edit.component';
import { UserProfileViewComponent } from './user-profile-view/user-profile-view.component';

export enum UserProfileRoutes {
  View = 'view',
  Edit = 'edit',
}

export default [
  {
    path: '',
    redirectTo: UserProfileRoutes.View,
    pathMatch: 'full',
  },
  {
    path: UserProfileRoutes.View,
    component: UserProfileViewComponent,
  },
  {
    path: UserProfileRoutes.Edit,
    component: UserProfileEditComponent,
  },
] satisfies Routes;
