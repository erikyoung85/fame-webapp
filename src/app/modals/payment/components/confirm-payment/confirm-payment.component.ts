import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
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
import { CurrencyInputComponent } from 'src/app/shared/components/currency-input/currency-input.component';
import { UserProfileAvatarComponent } from 'src/app/shared/components/user-profile-avatar/user-profile-avatar.component';
import { Payment } from '../../payment.component';

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
    ReactiveFormsModule,
    CurrencyInputComponent,
  ],
})
export class ConfirmPaymentComponent {
  private readonly fb = inject(NonNullableFormBuilder);

  @Input({ required: true }) athlete!: Athlete;
  @Input({ required: true }) payment!: Payment;
  @Output() onConfirmed = new EventEmitter<void>();
  @Output() onCanceled = new EventEmitter<void>();
}
