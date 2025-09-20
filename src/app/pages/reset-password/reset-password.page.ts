import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonInput,
  IonInputPasswordToggle,
  IonRow,
  IonText,
} from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import { RouterActions } from 'src/app/core/store/router/actions/router.actions';
import { userActions } from 'src/app/core/store/user/actions/user.actions';
import { confirmPasswordValidator } from 'src/app/shared/validators/confirm-password.validator';
@Component({
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonIcon,
    IonText,
    IonCol,
    IonRow,
    IonGrid,
    FormsModule,
    ReactiveFormsModule,
    IonButton,
    IonInput,
    IonContent,
    IonInputPasswordToggle,
  ],
})
export class ResetPasswordPage {
  private readonly store = inject(Store);
  private readonly fb = inject(NonNullableFormBuilder);

  readonly form = this.fb.group({
    password: this.fb.control('', [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/),
    ]),
    confirmPassword: this.fb.control('', [
      Validators.required,
      confirmPasswordValidator('password'),
    ]),
  });

  async resetPasswordClicked() {
    if (this.form.invalid) {
      return;
    }

    const formValue = this.form.getRawValue();

    this.store.dispatch(
      userActions.changePassword({
        newPassword: formValue.password,
      })
    );
  }

  onCancelClicked() {
    this.store.dispatch(
      RouterActions.route({
        url: '/',
        direction: 'back',
      })
    );
  }
}
