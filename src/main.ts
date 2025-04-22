import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideRouter,
  RouteReuseStrategy,
  withComponentInputBinding,
} from '@angular/router';
import { IonicRouteStrategy } from '@ionic/angular';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { provideState, provideStore } from '@ngrx/store';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { AthletesEffects } from './app/core/store/athletes/effects/athletes.effects';
import { athletesFeature } from './app/core/store/athletes/feature/athletes.feature';
import { getMetaReducers } from './app/core/store/meta-reducers/meta-reducers';
import { rootReducer } from './app/core/store/root.reducer';
import { RouterEffects } from './app/core/store/router/effects/router.effects';
import { TeamsEffects } from './app/core/store/teams/effects/teams.effects';
import { teamsFeature } from './app/core/store/teams/feature/teams.feature';
import { UserEffects } from './app/core/store/user/effects/user.effects';
import { userFeature } from './app/core/store/user/feature/user.feature';
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
    provideRouterStore(),
  ],
}).catch(console.error);
