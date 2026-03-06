import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideRouter,
  RouteReuseStrategy,
  withComponentInputBinding,
  withViewTransitions,
} from '@angular/router';
import { IonicRouteStrategy } from '@ionic/angular';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { provideState, provideStore } from '@ngrx/store';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { authInterceptor } from './app/core/interceptors/auth.interceptor';
import { AthletesEffects } from './app/core/store/athletes/effects/athletes.effects';
import { athletesFeature } from './app/core/store/athletes/feature/athletes.feature';
import { InviteEffects } from './app/core/store/invite/effects/invite.effects';
import { inviteFeature } from './app/core/store/invite/feature/invite.feature';
import { getMetaReducers } from './app/core/store/meta-reducers/meta-reducers';
import { PushNotificationsEffects } from './app/core/store/push-notifications/effects/push-notifications.effects';
import { pushNotificationsFeature } from './app/core/store/push-notifications/feature/push-notifications.feature';
import { RafflesEffects } from './app/core/store/raffles/effects/raffles.effects';
import { rafflesFeature } from './app/core/store/raffles/feature/raffles.feature';
import { rootReducer } from './app/core/store/root.reducer';
import { RouterEffects } from './app/core/store/router/effects/router.effects';
import { SearchEffects } from './app/core/store/search/effects/search.effects';
import { searchFeature } from './app/core/store/search/feature/search.feature';
import { StripeEffects } from './app/core/store/stripe/effects/stripe.effects';
import { stripeFeature } from './app/core/store/stripe/feature/stripe.feature';
import { TeamsEffects } from './app/core/store/teams/effects/teams.effects';
import { teamsFeature } from './app/core/store/teams/feature/teams.feature';
import { TransactionEffects } from './app/core/store/transaction/effects/transaction.effects';
import { transactionFeature } from './app/core/store/transaction/feature/transaction.feature';
import { UserEffects } from './app/core/store/user/effects/user.effects';
import { userFeature } from './app/core/store/user/feature/user.feature';
import { PaymentEffects } from './app/modals/payment/store/effects/payment.effects';
import { paymentFeature } from './app/modals/payment/store/feature/payment.feature';
import { environment } from './environments/environment';

defineCustomElements(window);

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular({ mode: 'ios' }),
    provideRouter(routes, withComponentInputBinding()),
    provideStore(rootReducer, {
      metaReducers: getMetaReducers(),
      initialState: {},
    }),
    provideEffects(RouterEffects),
    provideState(userFeature),
    provideEffects(UserEffects),
    provideState(teamsFeature),
    provideEffects(TeamsEffects),
    provideState(athletesFeature),
    provideEffects(AthletesEffects),
    provideState(searchFeature),
    provideEffects(SearchEffects),
    provideState(stripeFeature),
    provideEffects(StripeEffects),
    provideState(paymentFeature),
    provideEffects(PaymentEffects),
    provideState(rafflesFeature),
    provideEffects(RafflesEffects),
    provideState(transactionFeature),
    provideEffects(TransactionEffects),
    provideState(inviteFeature),
    provideEffects(InviteEffects),
    provideState(pushNotificationsFeature),
    provideEffects(PushNotificationsEffects),

    provideRouterStore(),
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
}).catch(console.error);
