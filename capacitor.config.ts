import type { CapacitorConfig } from '@capacitor/cli';
import { KeyboardResize, KeyboardStyle } from '@capacitor/keyboard';

const config: CapacitorConfig = {
  appId: 'com.thefamesports.fame',
  appName: 'FAME Sports',
  webDir: 'www/browser',
  plugins: {
    SplashScreen: {
      launchShowDuration: 20000,
    },
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
