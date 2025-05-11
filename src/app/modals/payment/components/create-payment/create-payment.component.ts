import {
  Component,
  inject,
  Input,
  OnDestroy,
  OnInit,
  output,
} from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Keyboard } from '@capacitor/keyboard';
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
import { Store } from '@ngrx/store';
import { Athlete } from 'src/app/core/models/Athlete.model';
import { CurrencyInputComponent } from 'src/app/shared/components/currency-input/currency-input.component';
import { UserProfileAvatarComponent } from 'src/app/shared/components/user-profile-avatar/user-profile-avatar.component';
import { CreatePayment } from '../../models/create-payment.model';

@Component({
  selector: 'app-create-payment',
  templateUrl: './create-payment.component.html',
  styleUrls: ['./create-payment.component.scss'],
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
export class CreatePaymentComponent implements OnInit, OnDestroy {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly store = inject(Store);

  @Input({ required: true }) athlete!: Athlete;
  @Input() payment?: CreatePayment;
  readonly onPaymentCreated = output<CreatePayment>();

  readonly form = this.fb.group({
    amount: this.fb.control(0, [
      Validators.required,
      Validators.min(1),
      Validators.max(10000),
    ]),
    message: this.fb.control('', [Validators.required]),
  });

  ngOnInit(): void {
    Keyboard.setAccessoryBarVisible({ isVisible: false });

    const inputPayment = this.payment;
    if (inputPayment !== undefined) {
      this.form.patchValue(inputPayment);
    }
  }

  ngOnDestroy(): void {
    Keyboard.setAccessoryBarVisible({ isVisible: true });
  }

  onDonateClicked() {
    if (this.form.valid) {
      const payment: CreatePayment = {
        ...this.form.getRawValue(),
        athleteId: this.athlete.id,
      };
      this.onPaymentCreated.emit(payment);
    }
  }
}
