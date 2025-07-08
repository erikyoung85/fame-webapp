import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  IonButton,
  IonCol,
  IonGrid,
  IonLabel,
  IonNote,
  IonRow,
  IonText,
} from '@ionic/angular/standalone';
import { Athlete } from 'src/app/core/models/Athlete.model';
import { Raffle } from 'src/app/core/models/Raffle.model';
import { StripePaymentIntent } from 'src/app/core/models/StripePaymentIntent.model';
import { CurrencyInputComponent } from 'src/app/shared/components/currency-input/currency-input.component';
import { UserProfileAvatarComponent } from 'src/app/shared/components/user-profile-avatar/user-profile-avatar.component';

@Component({
  selector: 'app-confirm-payment',
  templateUrl: './confirm-payment.component.html',
  styleUrls: ['./confirm-payment.component.scss'],
  imports: [
    IonNote,
    IonText,
    IonLabel,
    IonGrid,
    IonCol,
    IonRow,
    IonButton,
    UserProfileAvatarComponent,
    CurrencyInputComponent,
    ReactiveFormsModule,
  ],
})
export class ConfirmPaymentComponent {
  @Input({ required: true }) athlete!: Athlete;
  @Input({ required: true }) raffle!: Raffle;
  @Input({ required: true }) paymentIntent!: StripePaymentIntent;
  @Output() onPaymentConfirmed = new EventEmitter<StripePaymentIntent>();

  onConfirmClicked() {
    this.onPaymentConfirmed.emit(this.paymentIntent);
  }
}
