import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
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
  IonRow,
  IonText,
  IonToolbar,
} from '@ionic/angular/standalone';
import { SupabaseService } from 'src/app/services/supabase.service';
import { DividerComponent } from '../../components/divider/divider.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [
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
  private readonly supabaseService = inject(SupabaseService);

  readonly loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  async loginWithEmail() {
    if (this.loginForm.invalid) {
      console.error('Invalid form');
      return;
    }

    const request = {
      email: this.loginForm.value.email ?? '',
      password: this.loginForm.value.password ?? '',
    };
    console.log('Login request:', request);
    const response = await this.supabaseService.client.auth.signInWithPassword(
      request
    );

    if (response.error) {
      console.error('Login error:', response.error.message);
      return;
    }

    console.log('Login success:', response.data);
  }

  loginWithProvider(provider: 'google' | 'apple') {
    console.log('Login with provider:', provider);
    // window.location.href = `http://localhost:3000/auth/${provider}`;
  }
}
