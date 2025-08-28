import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonText,
  ModalController,
} from '@ionic/angular/standalone';

@Component({
  templateUrl: 'confirm-email-dialog.component.html',
  styleUrls: ['confirm-email-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonCardTitle,
    IonCardContent,
    IonText,
    IonCardHeader,
    IonCard,
    IonButton,
  ],
})
export class ConfirmEmailDialogComponent {
  private readonly modalController = inject(ModalController);

  onCloseClicked() {
    this.modalController.dismiss();
  }
}
