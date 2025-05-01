import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { Athlete } from 'src/app/core/models/Athlete.model';
import { SendPaymentComponent } from './components/send-payment/send-payment.component';

@Component({
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonButtons,
    IonButton,
    IonContent,
    IonTitle,
    IonToolbar,
    IonHeader,
    SendPaymentComponent,
  ],
})
export class PaymentModalComponent {
  private readonly modalController = inject(ModalController);

  @Input({ required: true }) athlete!: Athlete;

  cancel() {
    return this.modalController.dismiss(null, 'cancel');
  }
}
