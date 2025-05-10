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
  IonNav,
  IonProgressBar,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { LetDirective, PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { AsyncDataStatus } from 'src/app/core/models/AsyncData.model';
import { Athlete } from 'src/app/core/models/Athlete.model';
import { StripePaymentIntent } from 'src/app/core/models/StripePaymentIntent.model';
import { ConfirmPaymentComponent } from './components/confirm-payment/confirm-payment.component';
import { CreatePaymentComponent } from './components/create-payment/create-payment.component';
import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';
import { CreatePayment } from './models/create-payment.model';
import { PaymentTab, paymentTabsConfig } from './payment.routes';
import { paymentActions } from './store/actions/payment.actions';
import { paymentFeature } from './store/feature/payment.feature';

@Component({
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [IonNav],
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
    CreatePaymentComponent,
    ConfirmPaymentComponent,
    LetDirective,
    PushPipe,
    PaymentSuccessComponent,
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
  protected readonly paymentIntent$ = this.store.select(
    paymentFeature.selectPaymentIntent
  );

  protected readonly PaymentTab = PaymentTab;
  protected readonly paymentTabsConfig = paymentTabsConfig;

  payment: CreatePayment | undefined = undefined;

  onPaymentCreated(payment: CreatePayment) {
    this.payment = payment;
    this.store.dispatch(
      paymentActions.createPaymentIntent({ sendPayment: payment })
    );
  }

  onPaymentConfirmed(paymentIntent: StripePaymentIntent) {
    this.store.dispatch(
      paymentActions.collectPayment({ paymentIntent: paymentIntent })
    );
  }

  goToStep(step: PaymentTab) {
    this.store.dispatch(paymentActions.setPaymentTab({ tab: step }));
  }

  cancel() {
    return this.modalController.dismiss(null, 'cancel');
  }
}
