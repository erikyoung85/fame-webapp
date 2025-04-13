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
  IonInputPasswordToggle,
  IonMenuButton,
  IonNote,
  IonProgressBar,
  IonRow,
  IonText,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import { AppRoutes } from 'src/app/app.routes';
import { userActions } from 'src/app/core/user/store/actions/user.actions';
import { userFeature } from 'src/app/core/user/store/feature/user.feature';
import { DividerComponent } from '../../components/divider/divider.component';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.page.html',
  styleUrls: ['./user-signup.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
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
    CommonModule,
    IonHeader,
    IonMenuButton,
    IonInputPasswordToggle,
    DividerComponent,
  ],
})
export class UserSignupPage {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly fb = inject(NonNullableFormBuilder);

  readonly isUserSignupLoading$ = this.store.select(
    userFeature.selectIsLoginLoading
  );

  readonly userSignupForm = this.fb.group({
    fullName: this.fb.control('', [Validators.required]),
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/),
    ]),
  });

  async signupWithEmail() {
    if (this.userSignupForm.invalid) {
      return;
    }

    const formValue = this.userSignupForm.getRawValue();

    this.store.dispatch(
      userActions.signupWithPassword({
        fullName: formValue.fullName,
        email: formValue.email,
        password: formValue.password,
      })
    );
  }

  signupWithProvider(provider: 'google' | 'apple') {
    console.log('Signup with provider:', provider);
    // window.location.href = `http://localhost:3000/auth/${provider}`;
  }

  onLoginClicked() {
    this.router.navigate([AppRoutes.Login]);
  }
}
