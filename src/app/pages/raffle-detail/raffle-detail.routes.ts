import { Routes } from '@angular/router';
import { FormActionRoutes } from 'src/app/app.routes';
import { editRaffleGuard } from './guards/edit-raffle.guard';
import { RaffleDetailEditPage } from './raffle-detail-edit/raffle-detail-edit.page';
import { RaffleDetailViewPage } from './raffle-detail-view/raffle-detail-view.page';

export default [
  {
    path: '',
    redirectTo: FormActionRoutes.View,
    pathMatch: 'full',
  },
  {
    path: FormActionRoutes.View,
    component: RaffleDetailViewPage,
  },
  {
    path: FormActionRoutes.Edit,
    component: RaffleDetailEditPage,
    canActivate: [editRaffleGuard],
  },
] satisfies Routes;
