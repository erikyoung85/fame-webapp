import { Routes } from '@angular/router';
import { FormActionRoutes } from 'src/app/app.routes';
import { TeamDetailEditPage } from './team-detail-edit/team-detail-edit.page';
import { TeamDetailViewPage } from './team-detail-view/team-detail-view.page';

export default [
  {
    path: '',
    redirectTo: FormActionRoutes.View,
    pathMatch: 'full',
  },
  {
    path: FormActionRoutes.View,
    component: TeamDetailViewPage,
  },
  {
    path: FormActionRoutes.Edit,
    component: TeamDetailEditPage,
  },
] satisfies Routes;
