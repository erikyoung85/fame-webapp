import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonRow,
  IonText,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import { AppRoutes } from 'src/app/app.routes';
import { userActions } from 'src/app/core/store/user/actions/user.actions';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.page.html',
  styleUrls: ['./password-reset.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonBackButton,
    IonIcon,
    IonText,
    IonCol,
    IonRow,
    IonGrid,
    FormsModule,
    ReactiveFormsModule,
    IonButton,
    IonInput,
    IonButtons,
    IonContent,
    IonToolbar,
    IonHeader,
  ],
})
export class PasswordResetPage {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly fb = inject(NonNullableFormBuilder);

  readonly resetPasswordForm = this.fb.group({
    email: this.fb.control('', [Validators.required, Validators.email]),
  });

  async resetPasswordClicked() {
    if (this.resetPasswordForm.invalid) {
      return;
    }

    const formValue = this.resetPasswordForm.getRawValue();

    this.store.dispatch(
      userActions.resetPassword({
        email: formValue.email,
      })
    );
  }

  onLoginClicked() {
    this.router.navigate([AppRoutes.Login]);
  }
}
