import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
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
  IonMenuButton,
  IonProgressBar,
  IonRow,
  IonText,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import { userActions } from 'src/app/core/user/store/actions/user.actions';
import { userFeature } from 'src/app/core/user/store/feature/user.feature';
import { DividerComponent } from '../../components/divider/divider.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
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
export class LoginPage {
  private readonly store = inject(Store);

  readonly isLoginLoading$ = this.store.select(
    userFeature.selectIsLoginLoading
  );

  readonly loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  async loginWithEmail() {
    if (this.loginForm.invalid) {
      console.error('Invalid form');
      return;
    }

    this.store.dispatch(
      userActions.loginWithPassword({
        email: this.loginForm.value.email ?? '',
        password: this.loginForm.value.password ?? '',
      })
    );
  }

  loginWithProvider(provider: 'google' | 'apple') {
    console.log('Login with provider:', provider);
    // window.location.href = `http://localhost:3000/auth/${provider}`;
  }
}
