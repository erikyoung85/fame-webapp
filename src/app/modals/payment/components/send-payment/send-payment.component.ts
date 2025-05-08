import { Component, inject, Input, OnInit, output } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonButton,
  IonCol,
  IonGrid,
  IonLabel,
  IonNote,
  IonRow,
  IonText,
  IonTextarea,
} from '@ionic/angular/standalone';
import { Athlete } from 'src/app/core/models/Athlete.model';
import { CurrencyInputComponent } from 'src/app/shared/components/currency-input/currency-input.component';
import { UserProfileAvatarComponent } from 'src/app/shared/components/user-profile-avatar/user-profile-avatar.component';
import { SendPayment } from '../../models/send-payment.model';

@Component({
  selector: 'app-send-payment',
  templateUrl: './send-payment.component.html',
  styleUrls: ['./send-payment.component.scss'],
  imports: [
    IonTextarea,
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
export class SendPaymentComponent implements OnInit {
  private readonly fb = inject(NonNullableFormBuilder);

  @Input({ required: true }) athlete!: Athlete;
  @Input() payment?: SendPayment;
  readonly onPaymentCreated = output<SendPayment>();

  readonly form = this.fb.group({
    amount: this.fb.control(0, [
      Validators.required,
      Validators.min(1),
      Validators.max(10000),
    ]),
    message: this.fb.control('', [Validators.required]),
  });

  ngOnInit(): void {
    const inputPayment = this.payment;
    if (inputPayment !== undefined) {
      this.form.patchValue(inputPayment);
    }
  }

  onDonateClicked() {
    if (this.form.valid) {
      const payment: SendPayment = {
        ...this.form.getRawValue(),
        athleteId: this.athlete.id,
      };
      this.onPaymentCreated.emit(payment);
    }
  }
}
