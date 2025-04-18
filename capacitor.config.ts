import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.chaching.starter',
  appName: 'Cha Ching',
  webDir: 'www/browser',
  server: {
    url: 'http://192.168.1.162:3000',
    cleartext: true,
  },
  ios: {
    buildOptions: {},
  },
};

export default config;
