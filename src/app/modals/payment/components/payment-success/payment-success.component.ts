import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Haptics, NotificationType } from '@capacitor/haptics';
import {
  IonButton,
  IonCol,
  IonGrid,
  IonRow,
  IonText,
  ModalController,
} from '@ionic/angular/standalone';
import { ConfettiBackgroundComponent } from 'src/app/shared/components/confetti-background/confetti-background.component';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss'],
  imports: [
    IonText,
    IonRow,
    IonCol,
    IonGrid,
    IonButton,
    RouterModule,
    ConfettiBackgroundComponent,
  ],
})
export class PaymentSuccessComponent implements OnInit {
  private readonly modalController = inject(ModalController);

  ngOnInit(): void {
    Haptics.notification({ type: NotificationType.Success });
  }

  onCloseClicked() {
    this.modalController.dismiss();
  }
}
