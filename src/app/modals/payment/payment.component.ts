import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Input,
  OnDestroy,
  OnInit,
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
import { Observable } from 'rxjs';
import { AsyncData } from 'src/app/core/models/AsyncData.model';
import { AthleteDetail } from 'src/app/core/models/AthleteDetail.model';
import { Raffle } from 'src/app/core/models/Raffle.model';
import { StripePaymentIntent } from 'src/app/core/models/StripePaymentIntent.model';
import { ModalDismissRole } from 'src/app/core/services/modal-service/modal.service';
import { athletesActions } from 'src/app/core/store/athletes/actions/athletes.actions';
import { athletesFeature } from 'src/app/core/store/athletes/feature/athletes.feature';
import { stripeActions } from 'src/app/core/store/stripe/actions/stripe.actions';
import { stripeFeature } from 'src/app/core/store/stripe/feature/stripe.feature';
import { UnwrapAsyncPipe } from 'src/app/shared/pipes/unwrap-async/unwrap-async.pipe';
import { combineIsLoading } from 'src/app/shared/utils/combine-is-loading.util';
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
    PaymentSuccessComponent,
    PushPipe,
    UnwrapAsyncPipe,
  ],
})
export class PaymentModalComponent implements OnInit, OnDestroy {
  private readonly modalController = inject(ModalController);
  private readonly store = inject(Store);

  @Input({ required: true }) raffle!: Raffle;

  protected readonly currentTab$ = this.store.selectSignal(
    paymentFeature.selectCurrentTab
  );

  protected readonly stripeCustomer$ = this.store.selectSignal(
    stripeFeature.selectCustomer
  );
  protected readonly paymentIntent$ = this.store.selectSignal(
    paymentFeature.selectPaymentIntent
  );
  protected readonly isLoading$ = combineIsLoading([
    this.store.select(stripeFeature.selectCustomer),
    this.store.select(paymentFeature.selectPaymentIntent),
  ]);

  protected readonly PaymentTab = PaymentTab;
  protected readonly paymentTabsConfig = paymentTabsConfig;
  protected readonly currentTabConfig$ = computed(
    () => paymentTabsConfig[this.currentTab$()]
  );

  protected athlete$!: Observable<
    AsyncData<AthleteDetail | undefined> | undefined
  >;

  payment: CreatePayment | undefined = undefined;

  ngOnInit(): void {
    this.store.dispatch(stripeActions.loadCustomerForUser());

    this.store.dispatch(
      athletesActions.fetchAthleteDetails({ athleteId: this.raffle.athlete.id })
    );
    this.athlete$ = this.store.select(
      athletesFeature.selectAthleteDetails(this.raffle.athlete.id)
    );
  }

  ngOnDestroy(): void {
    this.store.dispatch(paymentActions.resetPaymentState());
  }

  onPaymentCreated(payment: CreatePayment) {
    const customerId = this.stripeCustomer$().data?.id;
    if (customerId === undefined) {
      console.error('Customer ID is undefined');
      return;
    }

    this.payment = payment;
    if (this.paymentIntent$().data !== undefined) {
      this.store.dispatch(
        paymentActions.updatePaymentIntent({
          customerId: customerId,
          sendPayment: payment,
        })
      );
    } else {
      this.store.dispatch(
        paymentActions.createPaymentIntent({
          customerId: customerId,
          sendPayment: payment,
        })
      );
    }
  }

  onPaymentConfirmed(paymentIntent: StripePaymentIntent) {
    this.store.dispatch(
      paymentActions.collectPayment({ paymentIntent: paymentIntent })
    );
  }

  onBackButtonClicked() {
    const previousTab = this.currentTabConfig$().previousTab;
    if (previousTab !== undefined) {
      this.store.dispatch(paymentActions.setPaymentTab({ tab: previousTab }));
    }
  }

  closeModal() {
    return this.modalController.dismiss(undefined, ModalDismissRole.Cancel);
  }
}
