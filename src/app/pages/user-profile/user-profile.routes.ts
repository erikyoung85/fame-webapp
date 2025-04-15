import { Routes } from '@angular/router';
import { FormMode } from 'src/app/core/enums/FormMode.enum';

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
    loadComponent: () =>
      import('./user-profile-view/user-profile-view.component').then(
        (m) => m.UserProfileViewComponent
      ),
    data: {
      formMode: FormMode.View,
    },
  },
  {
    path: UserProfileRoutes.Edit,
    loadComponent: () =>
      import('./user-profile-edit/user-profile-edit.component').then(
        (m) => m.UserProfileEditComponent
      ),
    data: {
      formMode: FormMode.Edit,
    },
  },
] satisfies Routes;
