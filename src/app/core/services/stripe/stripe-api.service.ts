import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SupabaseService } from '../supabase/supabase.service';
import { CreatePaymentIntentRequestDtoV1 } from './dtos/requests/create-payment-intent.request.dto.v1';
import { UpdatePaymentIntentRequestDtoV1 } from './dtos/requests/update-payment-intent.request.dto.v1';
import { PaymentIntentResponseDtoV1 } from './dtos/responses/payment-intent.response.dto.v1';
import { StripeCustomerResponseDtoV1 } from './dtos/responses/stripe-customer.response.dto.v1';

@Injectable({
  providedIn: 'root',
})
export class StripeApiService {
  private readonly http = inject(HttpClient);
  private readonly supabaseService = inject(SupabaseService);

  getCurrentUserCustomer(): Observable<StripeCustomerResponseDtoV1> {
    const url = `${environment.microserviceUrl}/stripe/getOrCreateCustomerForUser`;
    return this.http.get<StripeCustomerResponseDtoV1>(url);
  }

  createPaymentIntent(
    request: CreatePaymentIntentRequestDtoV1
  ): Observable<PaymentIntentResponseDtoV1> {
    const url = `${environment.microserviceUrl}/stripe/createPaymentIntent`;
    return this.http.post<PaymentIntentResponseDtoV1>(url, request);
  }

  updatePaymentIntent(
    request: UpdatePaymentIntentRequestDtoV1
  ): Observable<PaymentIntentResponseDtoV1> {
    const url = `${environment.microserviceUrl}/stripe/updatePaymentIntent`;
    return this.http.post<PaymentIntentResponseDtoV1>(url, request);
  }
}
