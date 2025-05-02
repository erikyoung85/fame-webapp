import { NgFor } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
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
import { TeamDetail } from 'src/app/core/models/TeamDetail.model';
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
export class TeamDetailComponent {
  private readonly modalController = inject(ModalController);

  @Input() teamDetails!: TeamDetail;

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
}
