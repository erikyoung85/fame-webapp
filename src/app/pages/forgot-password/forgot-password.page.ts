import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
import { PageRoutes } from 'src/app/app.routes';
import { RouterActions } from 'src/app/core/store/router/actions/router.actions';
import { userActions } from 'src/app/core/store/user/actions/user.actions';
@Component({
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
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
export class ForgotPasswordPage {
  private readonly store = inject(Store);
  private readonly fb = inject(NonNullableFormBuilder);

  readonly form = this.fb.group({
    email: this.fb.control('', [Validators.required, Validators.email]),
  });

  async resetPasswordClicked() {
    if (this.form.invalid) {
      return;
    }

    const formValue = this.form.getRawValue();

    this.store.dispatch(
      userActions.forgotPassword({
        email: formValue.email,
      })
    );
  }

  onLoginClicked() {
    this.store.dispatch(
      RouterActions.routeInCurrentTab({
        url: [PageRoutes.Login],
        direction: 'back',
      })
    );
  }
}
