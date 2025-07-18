import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonText,
  ModalController,
} from '@ionic/angular/standalone';
import { AcceptInviteResponseDtoV1 } from 'src/app/core/services/invite/dtos/responses/accept-invite.response.dto.v1';

@Component({
  templateUrl: './accepted-invite.component.html',
  styleUrls: ['./accepted-invite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonText,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonButton,
    CommonModule,
  ],
})
export class AcceptedInviteModalComponent {
  private readonly modalController = inject(ModalController);

  @Input({ required: true }) acceptedInvite!: AcceptInviteResponseDtoV1;

  closeModal() {
    return this.modalController.dismiss();
  }
}
