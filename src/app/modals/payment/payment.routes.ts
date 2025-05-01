import { Routes } from '@angular/router';
import { SendPaymentComponent } from './components/send-payment/send-payment.component';

export enum PaymentRoutes {
  SendPayment = 'send-payment',
}

export default [
  {
    path: '',
    redirectTo: PaymentRoutes.SendPayment,
    pathMatch: 'full',
  },
  {
    path: PaymentRoutes.SendPayment,
    component: SendPaymentComponent,
  },
] satisfies Routes;
