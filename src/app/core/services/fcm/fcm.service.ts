import { inject, Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { PushNotifications, Token } from '@capacitor/push-notifications';
import { Store } from '@ngrx/store';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { from, Observable } from 'rxjs';
import { Platform } from '../../enums/Platform.enum';
import { pushNotificationsActions } from '../../store/push-notifications/actions/push-notifications.actions';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class FCMService {
  private readonly supabaseService = inject(SupabaseService);
  private readonly store = inject(Store);

  private fcmToken: string | null = null;

  async registerFCM() {
    if (
      Capacitor.getPlatform() !== 'ios' &&
      Capacitor.getPlatform() !== 'android'
    ) {
      return;
    }

    // Request permission
    let permStatus = await PushNotifications.checkPermissions();
    if (permStatus.receive !== 'granted') {
      permStatus = await PushNotifications.requestPermissions();
    }
    if (permStatus.receive !== 'granted') {
      console.warn('Push permission not granted');
      return;
    }

    // Register with APNs/FCM
    await PushNotifications.register();

    // Listen for token
    PushNotifications.addListener('registration', async (token: Token) => {
      console.log('Device token (APNs or FCM):', token.value);
      this.store.dispatch(
        pushNotificationsActions.saveFCMToken({ token: token.value })
      );
    });

    // Handle received push
    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification) => {
        console.log('Push received:', notification);
      }
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification) => {
        console.log('Push tapped:', notification.notification);
      }
    );
  }

  saveTokenToSupabase(
    userId: string,
    token: string
  ): Observable<PostgrestSingleResponse<null>> {
    const platform = Capacitor.getPlatform();
    const platformEnum =
      Platform[platform as keyof typeof Platform] || Platform.web;

    const response = from(
      this.supabaseService.client
        .from('push_tokens')
        .insert({ profile_id: userId, token: token, platform: platformEnum })
    );

    return response;
  }
}
