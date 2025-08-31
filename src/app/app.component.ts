import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
} from '@angular/core';
import { App, URLOpenListenerEvent } from '@capacitor/app';
import { Keyboard, KeyboardResize } from '@capacitor/keyboard';
import { SplashScreen } from '@capacitor/splash-screen';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import { addIcons } from 'ionicons';
import * as ionIcons from 'ionicons/icons';
import { isAsyncLoaded } from './core/async-data';
import { FCMService } from './core/services/fcm/fcm.service';
import { teamsFeature } from './core/store/teams/feature/teams.feature';
import { userFeature } from './core/store/user/feature/user.feature';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  readonly fcmService = inject(FCMService);
  readonly store = inject(Store);

  readonly isEverythingLoaded = computed(() => {
    const isSessionLoaded = isAsyncLoaded(
      this.store.selectSignal(userFeature.selectSession)()
    );
    const isProfileLoaded = isAsyncLoaded(
      this.store.selectSignal(userFeature.selectUserProfile)()
    );
    const isFavoriteTeamLoaded = isAsyncLoaded(
      this.store.selectSignal(teamsFeature.selectFavoriteTeam)()
    );

    return isSessionLoaded && isProfileLoaded && isFavoriteTeamLoaded;
  });

  constructor() {
    // Hide splash screen when app is ready
    effect(async () => {
      if (this.isEverythingLoaded()) {
        await SplashScreen.hide();
      }
    });

    // Ionicons
    addIcons({ ...ionIcons });

    // Keyboard
    Keyboard.setResizeMode({ mode: KeyboardResize.None });
    Keyboard.setAccessoryBarVisible({ isVisible: true });

    // Push notifications
    this.fcmService.registerFCM();

    // Open linked URLs in app
    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
      console.log('App URL Open Event', event);
    });
  }
}
