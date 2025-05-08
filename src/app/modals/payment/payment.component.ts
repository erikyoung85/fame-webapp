import { NgIf } from '@angular/common';
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
  IonIcon,
  IonProgressBar,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { AsyncDataStatus } from 'src/app/core/models/AsyncData.model';
import { Athlete } from 'src/app/core/models/Athlete.model';
import { AddPaymentMethodComponent } from './components/add-payment-method/add-payment-method.component';
import { SendPaymentComponent } from './components/send-payment/send-payment.component';
import { PaymentTab } from './models/payment-tab.enum';
import { SendPayment } from './models/send-payment.model';
import { paymentActions } from './store/actions/payment.actions';
import { paymentFeature } from './store/feature/payment.feature';

type PaymentTabConfig = {
  [step in PaymentTab]: {
    title: string;
    step: step;
    data?: Object;
  };
};

@Component({
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonIcon,
    IonProgressBar,
    IonButtons,
    IonButton,
    IonContent,
    IonTitle,
    IonToolbar,
    IonHeader,
    NgIf,
    SendPaymentComponent,
    AddPaymentMethodComponent,
    PushPipe,
  ],
})
export class PaymentModalComponent {
  private readonly modalController = inject(ModalController);
  private readonly store = inject(Store);

  @Input({ required: true }) athlete!: Athlete;

  protected readonly currentTab = this.store.selectSignal(
    paymentFeature.selectCurrentTab
  );
  protected readonly isLoading$ = this.store
    .select(paymentFeature.selectPaymentIntent)
    .pipe(map((async) => async.status === AsyncDataStatus.Loading));

  payment: SendPayment | undefined = undefined;

  protected readonly PaymentTab = PaymentTab;
  protected readonly paymentTabsConfig: PaymentTabConfig = {
    [PaymentTab.SendPayment]: {
      title: 'Send Payment',
      step: PaymentTab.SendPayment,
    },
    [PaymentTab.AddPaymentMethod]: {
      title: 'Add Payment Method',
      step: PaymentTab.AddPaymentMethod,
    },
  };

  onPaymentCreated(payment: SendPayment) {
    this.payment = payment;
    this.store.dispatch(
      paymentActions.getPaymentIntent({ sendPayment: payment })
    );
  }

  onPaymentConfirmed() {
    console.log('Payment confirmed', this.payment);
  }

  goToStep(step: PaymentTab) {
    this.store.dispatch(paymentActions.setPaymentTab({ tab: step }));
  }

  cancel() {
    return this.modalController.dismiss(null, 'cancel');
  }
}
