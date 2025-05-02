import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  signal,
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
import { ConfirmPaymentComponent } from './components/confirm-payment/confirm-payment.component';
import { SendPaymentComponent } from './components/send-payment/send-payment.component';

enum PaymentStep {
  SendPayment = 'SendPayment',
  ConfirmPayment = 'ConfirmPayment',
}

type PaymentStepConfig = {
  [step in PaymentStep]: {
    title: string;
    step: step;
    data?: Object;
  };
};

export interface Payment {
  amount: number;
  message: string;
}

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
    NgIf,
    SendPaymentComponent,
    ConfirmPaymentComponent,
  ],
})
export class PaymentModalComponent {
  private readonly modalController = inject(ModalController);

  @Input({ required: true }) athlete!: Athlete;

  payment: Payment | undefined = undefined;

  currentStep = signal(PaymentStep.SendPayment);
  PaymentStep = PaymentStep;
  paymentSteps: PaymentStepConfig = {
    [PaymentStep.SendPayment]: {
      title: 'Send Payment',
      step: PaymentStep.SendPayment,
    },
    [PaymentStep.ConfirmPayment]: {
      title: 'Confirm Payment',
      step: PaymentStep.ConfirmPayment,
    },
  };

  onPaymentCreated(payment: Payment) {
    this.payment = payment;
    this.currentStep.set(PaymentStep.ConfirmPayment);
  }

  onPaymentConfirmed() {
    console.log('Payment confirmed', this.payment);
  }

  goToStep(step: PaymentStep) {
    this.currentStep.set(step);
  }

  cancel() {
    return this.modalController.dismiss(null, 'cancel');
  }
}
