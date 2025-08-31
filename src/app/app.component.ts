import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { App, URLOpenListenerEvent } from '@capacitor/app';
import { Keyboard, KeyboardResize } from '@capacitor/keyboard';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import * as ionIcons from 'ionicons/icons';
import { FCMService } from './core/services/fcm/fcm.service';

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

  constructor() {
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
