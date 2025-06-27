import type { CapacitorConfig } from '@capacitor/cli';
import { KeyboardResize, KeyboardStyle } from '@capacitor/keyboard';

const config: CapacitorConfig = {
  appId: 'app.fame.starter',
  appName: 'FAME',
  webDir: 'www/browser',
  ios: {
    buildOptions: {},
  },
  plugins: {
    Keyboard: {
      resize: KeyboardResize.None,
      style: KeyboardStyle.Default,
    },
  },
};

export default config;
