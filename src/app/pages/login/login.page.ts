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
  IonNote,
  IonProgressBar,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import { PageRoutes } from 'src/app/app.routes';
import { RouterActions } from 'src/app/core/store/router/actions/router.actions';
import { userActions } from 'src/app/core/store/user/actions/user.actions';
import { userFeature } from 'src/app/core/store/user/feature/user.feature';
import { DividerComponent } from '../../shared/components/divider/divider.component';

@Component({
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonTitle,
    CommonModule,
    IonNote,
    IonProgressBar,
    IonText,
    IonCol,
    IonRow,
    IonGrid,
    FormsModule,
    ReactiveFormsModule,
    IonButton,
    IonInput,
    IonIcon,
    IonButtons,
    IonContent,
    IonToolbar,
    IonHeader,
    DividerComponent,
  ],
})
export class LoginPage {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly fb = inject(NonNullableFormBuilder);

  readonly isLoading$ = this.store.select(userFeature.selectIsSessionLoading);

  readonly loginForm = this.fb.group({
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [Validators.required]),
  });

  async loginWithEmail() {
    if (this.loginForm.invalid) {
      return;
    }

    const formValue = this.loginForm.getRawValue();

    this.store.dispatch(
      userActions.loginWithPassword({
        email: formValue.email,
        password: formValue.password,
      })
    );
  }

  loginWithProvider(provider: 'google' | 'apple') {
    console.log('Login with provider:', provider);
    // window.location.href = `http://localhost:3000/auth/${provider}`;
  }

  onRegisterClicked() {
    this.store.dispatch(
      RouterActions.routeInCurrentTab({ url: [PageRoutes.Register] })
    );
  }

  onForgotPasswordClicked() {
    this.store.dispatch(
      RouterActions.routeInCurrentTab({ url: [PageRoutes.PasswordReset] })
    );
  }
}
