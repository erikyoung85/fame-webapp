import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
  IonNote,
  IonProgressBar,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import { PageRoutes } from 'src/app/app.routes';
import { SignupWithPasswordRequestDtoV1 } from 'src/app/core/services/user/dtos/requests/signup-with-password.request.dto.v1';
import { RouterActions } from 'src/app/core/store/router/actions/router.actions';
import { userActions } from 'src/app/core/store/user/actions/user.actions';
import { userFeature } from 'src/app/core/store/user/feature/user.feature';
import { DividerComponent } from '../../shared/components/divider/divider.component';

@Component({
  templateUrl: './user-signup.page.html',
  styleUrls: ['./user-signup.page.scss'],
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
    IonInputPasswordToggle,
    DividerComponent,
  ],
})
export class UserSignupPage {
  private readonly store = inject(Store);
  private readonly fb = inject(NonNullableFormBuilder);

  readonly isLoading$ = this.store.select(userFeature.selectIsSessionLoading);

  readonly userSignupForm = this.fb.group({
    firstName: this.fb.control('', [Validators.required]),
    lastName: this.fb.control('', [Validators.required]),
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

    const request: SignupWithPasswordRequestDtoV1 = {
      email: formValue.email,
      password: formValue.password,
      firstName: formValue.firstName,
      lastName: formValue.lastName,
    };

    this.store.dispatch(userActions.signupWithPassword({ request: request }));
  }

  signupWithProvider(provider: 'google' | 'apple') {
    console.log('Signup with provider:', provider);
  }

  onLoginClicked() {
    this.store.dispatch(
      RouterActions.routeInCurrentTab({ url: PageRoutes.Login })
    );
  }
}
