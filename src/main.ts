import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouteReuseStrategy } from '@angular/router';
import { IonicRouteStrategy } from '@ionic/angular';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { provideState, provideStore } from '@ngrx/store';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { getMetaReducers } from './app/core/store/meta-reducers/meta-reducers';
import { rootReducer } from './app/core/store/root.reducer';
import { RootStateKey } from './app/core/store/root.state';
import { CustomRouteSerializer } from './app/core/store/router/state/custom-route-serializer';
import { INITIAL_ROUTER_STATE } from './app/core/store/router/state/router.initial-state';
import { UserEffects } from './app/core/store/user/effects/user.effects';
import { userFeature } from './app/core/store/user/feature/user.feature';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular({ mode: 'ios' }),
    provideRouter(routes),
    provideStore(rootReducer, {
      metaReducers: getMetaReducers(),
      initialState: {
        [RootStateKey.ROUTER]: INITIAL_ROUTER_STATE,
      },
    }),
    provideState(userFeature),
    provideEffects(UserEffects),
    provideRouterStore({ serializer: CustomRouteSerializer }),
  ],
}).catch(console.error);
