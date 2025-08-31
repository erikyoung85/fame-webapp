export interface CreatePushTokenRequestDtoV1 {
  token: string;
  userId?: string;
  platform: 'ios' | 'android' | 'web';
}
