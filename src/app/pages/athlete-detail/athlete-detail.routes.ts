import { Routes } from '@angular/router';
import { FormActionRoutes } from 'src/app/app.routes';
import { AthleteDetailEditPage } from './athlete-detail-edit/athlete-detail-edit.page';
import { AthleteDetailViewPage } from './athlete-detail-view/athlete-detail-view.page';

export default [
  {
    path: '',
    redirectTo: FormActionRoutes.View,
    pathMatch: 'full',
  },
  {
    path: FormActionRoutes.View,
    component: AthleteDetailViewPage,
  },
  {
    path: FormActionRoutes.Edit,
    component: AthleteDetailEditPage,
  },
] satisfies Routes;
