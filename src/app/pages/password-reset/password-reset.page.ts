import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NavController } from '@ionic/angular';
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
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly navController = inject(NavController);

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
    this.navController.navigateBack([AppRoutes.Login]);
  }
}
