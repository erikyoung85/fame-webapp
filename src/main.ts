import { bootstrapApplication } from '@angular/platform-browser';
import { provideIonicAngular } from '@ionic/angular/standalone';

import { enableProdMode } from '@angular/core';
import { provideRouter, RouteReuseStrategy } from '@angular/router';
import { IonicRouteStrategy } from '@ionic/angular';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { getMetaReducers } from './app/core/meta-reducers/meta-reducers';
import { UserEffects } from './app/core/user/store/effects/user.effects';
import { userFeature } from './app/core/user/store/feature/user.feature';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular({ mode: 'ios' }),
    provideRouter(routes),
    provideStore(
      {},
      {
        metaReducers: getMetaReducers(),
        initialState: {},
      }
    ),
    provideState(userFeature),
    provideEffects(UserEffects),
  ],
}).catch(console.error);
