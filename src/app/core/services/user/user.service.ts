import { inject, Injectable } from '@angular/core';
import {
  AuthResponse,
  AuthTokenResponsePassword,
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from '@supabase/supabase-js';
import { from, Observable } from 'rxjs';
import { SupabaseService } from '../supabase/supabase.service';
import { SignupWithPasswordRequestDtoV1 } from './dtos/requests/signup-with-password.request.dto.v1';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly supabaseService = inject(SupabaseService);

  loginWithPassword(
    email: string,
    password: string
  ): Observable<AuthTokenResponsePassword> {
    const authBody: SignInWithPasswordCredentials = {
      email: email,
      password: password,
    };
    return from(this.supabaseService.client.auth.signInWithPassword(authBody));
  }

  signupWithPassword(
    requestDto: SignupWithPasswordRequestDtoV1
  ): Observable<AuthResponse> {
    const authBody: SignUpWithPasswordCredentials = {
      email: requestDto.email,
      password: requestDto.password,
      options: {
        data: {
          first_name: requestDto.firstName,
          last_name: requestDto.lastName,
        },
      },
    };
    return from(this.supabaseService.client.auth.signUp(authBody));
  }

  resetPasswordForEmail(email: string) {
    return from(this.supabaseService.client.auth.resetPasswordForEmail(email));
  }
}
