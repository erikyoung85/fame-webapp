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
import { getMetaReducers } from './app/core/store/meta-reducers/meta-reducers';
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
    provideRouter(routes, withComponentInputBinding(), withViewTransitions()),
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

    provideRouterStore(),
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
}).catch(console.error);
