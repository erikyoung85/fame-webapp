import { inject, Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { PaymentModalComponent } from 'src/app/modals/payment/payment.component';
import { PickCityModalComponent } from 'src/app/modals/pick-city/pick-city.component';
import { PickTeamModalComponent } from 'src/app/modals/pick-team/pick-team.component';
import { Athlete } from '../../models/Athlete.model';
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

  async openPaymentModal(athlete: Athlete): Promise<boolean | undefined> {
    const modal = await this.modalController.create({
      component: PaymentModalComponent,
      componentProps: {
        athlete: athlete,
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
}
