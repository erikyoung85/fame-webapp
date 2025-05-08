import type { CapacitorConfig } from '@capacitor/cli';
import { KeyboardResize, KeyboardStyle } from '@capacitor/keyboard';

const config: CapacitorConfig = {
  appId: 'app.chaching.starter',
  appName: 'Cha Ching',
  webDir: 'www/browser',
  server: {
    url: 'http://192.168.1.160:4200',
    cleartext: true,
  },
  ios: {
    buildOptions: {},
  },
  plugins: {
    Keyboard: {
      resize: KeyboardResize.Ionic,
      style: KeyboardStyle.Default,
    },
  },
};

export default config;
