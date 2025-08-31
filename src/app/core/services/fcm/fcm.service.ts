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

    // Listen for token
    PushNotifications.addListener('registration', async (token: Token) => {
      console.log('Device token (APNs or FCM):', token.value);
      this.store.dispatch(
        pushNotificationsActions.saveToken({ token: token.value })
      );
    });
    PushNotifications.addListener('registrationError', (error) => {
      console.error(
        'Error occurred while registering for push notifications:',
        error
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

    // Register with APNs/FCM
    PushNotifications.register();
  }

  saveTokenToSupabase(request: {
    token: string;
    userId?: string | undefined;
    platform?: Platform;
  }): Observable<PostgrestSingleResponse<null>> {
    const platform = request.platform ?? Capacitor.getPlatform();
    const platformEnum =
      Platform[platform as keyof typeof Platform] || Platform.web;

    const response = from(
      this.supabaseService.client.from('push_tokens').upsert(
        {
          token: request.token,
          profile_id: request.userId ?? null,
          platform: platformEnum,
        },
        { ignoreDuplicates: false, onConflict: 'token' }
      )
    );

    return response;
  }
}
