import { inject, Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { CreateRaffleModalComponent } from 'src/app/modals/create-raffle/create-raffle.component';
import { PaymentModalComponent } from 'src/app/modals/payment/payment.component';
import { PickCityModalComponent } from 'src/app/modals/pick-city/pick-city.component';
import { PickTeamModalComponent } from 'src/app/modals/pick-team/pick-team.component';
import { Raffle } from '../../models/Raffle.model';
import { CityResponseDtoV1 } from '../geo-city/dtos/city.response.dto.v1';

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
}
