import { Routes } from '@angular/router';
import { FormActionRoutes } from 'src/app/app.routes';
import { UserProfileEditComponent } from './user-profile-edit/user-profile-edit.component';
import { UserProfileViewComponent } from './user-profile-view/user-profile-view.component';

export default [
  {
    path: '',
    redirectTo: FormActionRoutes.View,
    pathMatch: 'full',
  },
  {
    path: FormActionRoutes.View,
    component: UserProfileViewComponent,
  },
  {
    path: FormActionRoutes.Edit,
    component: UserProfileEditComponent,
  },
] satisfies Routes;
