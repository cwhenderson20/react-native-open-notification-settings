import type { EmitterSubscription } from 'react-native';
import { NativeEventEmitter } from 'react-native';
import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-open-notification-settings' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const OpenNotificationSettings = NativeModules.OpenNotificationSettings
  ? NativeModules.OpenNotificationSettings
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );
const eventEmitter = new NativeEventEmitter(OpenNotificationSettings);

export function onOpenSettingsForNotification(
  callback: () => void
): EmitterSubscription {
  return eventEmitter.addListener('settings_for_notification_opened', callback);
}

export function getDidOpenSettingsForNotification(): Promise<boolean> {
  if (Platform.OS !== 'ios') {
    return Promise.resolve(false);
  }
  return OpenNotificationSettings.getDidOpenSettingsForNotification();
}
