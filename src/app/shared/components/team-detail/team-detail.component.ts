import { NgFor } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import {
  IonButton,
  IonCol,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
  IonRow,
  IonText,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import { PageRoutes } from 'src/app/app.routes';
import { TeamDetail } from 'src/app/core/models/TeamDetail.model';
import { RouterActions } from 'src/app/core/store/router/actions/router.actions';
import { PaymentModalComponent } from 'src/app/modals/payment/payment.component';
import { UserProfileAvatarComponent } from '../user-profile-avatar/user-profile-avatar.component';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss'],
  imports: [
    IonToolbar,
    IonHeader,
    IonButton,
    IonNote,
    IonListHeader,
    IonLabel,
    IonItem,
    IonIcon,
    IonList,
    IonText,
    IonCol,
    IonRow,
    IonGrid,
    UserProfileAvatarComponent,
    NgFor,
  ],
})
export class TeamDetailComponent implements OnInit {
  private readonly modalController = inject(ModalController);
  private readonly store = inject(Store);

  @Input() teamDetails!: TeamDetail;

  ngOnInit(): void {}

  async onPayClicked() {
    const modal = await this.modalController.create({
      component: PaymentModalComponent,
      componentProps: {
        athlete: this.teamDetails.rosterAthletes[0],
      },
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
  }

  onAthleteClicked(athlete: TeamDetail['rosterAthletes'][number]) {
    this.store.dispatch(
      RouterActions.routeInCurrentTab({
        url: [PageRoutes.AthleteDetail, athlete.id],
      })
    );
  }
}
