import { inject, Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { AcceptedInviteModalComponent } from 'src/app/modals/accepted-invite/accepted-invite.component';
import { ConfirmEmailDialogComponent } from 'src/app/modals/confirm-email-dialog/confirm-email-dialog.component';
import { CreateRaffleModalComponent } from 'src/app/modals/create-raffle/create-raffle.component';
import { PaymentModalComponent } from 'src/app/modals/payment/payment.component';
import { PickCityModalComponent } from 'src/app/modals/pick-city/pick-city.component';
import { PickTeamModalComponent } from 'src/app/modals/pick-team/pick-team.component';
import { Raffle } from '../../models/Raffle.model';
import { CityResponseDtoV1 } from '../geo-city/dtos/city.response.dto.v1';
import { AcceptInviteResponseDtoV1 } from '../invite/dtos/responses/accept-invite.response.dto.v1';

export enum ModalDismissRole {
  Cancel = 'cancel',
  Confirm = 'confirm',
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private readonly modalController = inject(ModalController);

  async openCityPicker(): Promise<CityResponseDtoV1 | undefined> {
    const modal = await this.modalController.create({
      component: PickCityModalComponent,
    });
    modal.present();
    const response = await modal.onWillDismiss<CityResponseDtoV1 | undefined>();

    if (response.role === ModalDismissRole.Confirm) {
      return response.data;
    }

    return undefined;
  }

  async openPaymentModal(raffle: Raffle): Promise<boolean | undefined> {
    const modal = await this.modalController.create({
      component: PaymentModalComponent,
      componentProps: {
        raffle: raffle,
      },
    });
    modal.present();
    const response = await modal.onWillDismiss<boolean | undefined>();

    if (response.role === ModalDismissRole.Confirm) {
      return response.data;
    }

    return undefined;
  }

  async openPickTeam(): Promise<number | undefined> {
    const modal = await this.modalController.create({
      component: PickTeamModalComponent,
    });
    modal.present();

    const response = await modal.onWillDismiss<number | undefined>();

    if (response.role === ModalDismissRole.Confirm) {
      return response.data;
    }

    return undefined;
  }

  async openCreateRaffle(athleteId: number): Promise<boolean | undefined> {
    const modal = await this.modalController.create({
      component: CreateRaffleModalComponent,
      componentProps: {
        athleteId: athleteId,
      },
    });
    modal.present();

    const response = await modal.onWillDismiss<boolean | undefined>();

    if (response.role === ModalDismissRole.Confirm) {
      return response.data;
    }

    return undefined;
  }

  async openAcceptedInvite(
    acceptedInvite: AcceptInviteResponseDtoV1
  ): Promise<void> {
    const modal = await this.modalController.create({
      component: AcceptedInviteModalComponent,
      cssClass: 'custom-dialog',
      componentProps: {
        acceptedInvite: acceptedInvite,
      },
    });
    modal.present();

    await modal.onWillDismiss<void>();
  }

  async openConfirmEmailDialog(): Promise<void> {
    const modal = await this.modalController.create({
      component: ConfirmEmailDialogComponent,
      cssClass: 'custom-dialog',
    });
    modal.present();

    await modal.onWillDismiss<void>();
  }
}
