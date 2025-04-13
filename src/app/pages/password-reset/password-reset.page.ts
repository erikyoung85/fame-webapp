import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonMenuButton,
  IonProgressBar,
  IonRow,
  IonText,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import { AppRoutes } from 'src/app/app.routes';
import { userActions } from 'src/app/core/user/store/actions/user.actions';
import { userFeature } from 'src/app/core/user/store/feature/user.feature';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.page.html',
  styleUrls: ['./password-reset.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonIcon,
    IonProgressBar,
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
    CommonModule,
    IonHeader,
    IonMenuButton,
  ],
})
export class PasswordResetPage {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly fb = inject(NonNullableFormBuilder);

  readonly isLoginLoading$ = this.store.select(
    userFeature.selectIsLoginLoading
  );

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
