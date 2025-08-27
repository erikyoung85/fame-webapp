import type { CapacitorConfig } from '@capacitor/cli';
import { KeyboardResize, KeyboardStyle } from '@capacitor/keyboard';

const config: CapacitorConfig = {
  appId: 'com.thefamesports.fame',
  appName: 'FAME Sports',
  webDir: 'www/browser',
  server: {
    url: 'http://192.168.1.78:4200',
    cleartext: true,
  },
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
    Keyboard: {
      resize: KeyboardResize.None,
      style: KeyboardStyle.Default,
    },
  },
};

export default config;
