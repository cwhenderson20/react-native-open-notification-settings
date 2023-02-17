# react-native-open-notification-settings

Respond to the iOS [`openSettingsForNotification`](https://developer.apple.com/documentation/usernotifications/unusernotificationcenterdelegate/2981869-usernotificationcenter) API from React Native.

![open_notification_settings](https://user-images.githubusercontent.com/5496110/219788770-d8673d43-57f2-4bb6-952e-32b8b840909a.png)

## Installation

```sh
yarn add react-native-open-notification-settings
npx pod-install
```

### iOS

Modify the `AppDelegate.h` file to conform to the `UNUserNotificationCenterDelegate` protocol:

```objc
@interface AppDelegate : RCTAppDelegate <UNUserNotificationCenterDelegate>
  // ...
@end
```

<details>
<summary>
(Older versions of React Native)
</summary>

```objc
@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate, UNUserNotificationCenterDelegate>
  // ...
@end
```

</details>

Modify `AppDelegate.mm` to add the following lines:

```objc
// imports
#import <UserNotifications/UserNotifications.h>
#import <OpenNotificationSettings.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  //...
  // set the notification center delegate
  [[UNUserNotificationCenter currentNotificationCenter] setDelegate:self];
}

//...

// attach the listener
- (void)userNotificationCenter:(UNUserNotificationCenter *) center
   openSettingsForNotification:(nullable UNNotification *)notification {
  [[OpenNotificationSettings sharedInstance] openSettingsForNotification];
}
@end
```

### Android

There is no setup since this module is basically a no-op for Android. The methods are safe to use but will have no effect.

## Usage

**Note:** Your app must request notification permissions with the `providesAppNotificationSettings` option specified in order to see the option to open notification settings from within the Settings app. The popular [react-native-permissions](https://github.com/zoontek/react-native-permissions#requestnotifications) library lets you do this out of the box.

```ts
import {
  getDidOpenSettingsForNotification,
  onOpenSettingsForNotification,
} from 'react-native-open-notification-settings';

function App() {
  useEffect(() => {
    // to respond to app opens from a killed state
    getDidOpenSettingsForNotification().then((didOpenSettings) => {
      if (didOpenSettings) {
        respondToOpenSettings();
      }
    });

    // to respond to app opens from a background state
    const listener = onOpenSettingsForNotification(() => {
      respondToOpenSettings();
    });

    function respondToOpenSettings() {
      // respond here by navigating or showing some UI
      Linking.openURL('my-app-schema://path/to/notification/settings');
    }

    return () => {
      listener.remove();
    };
  }, []);

  return <View />;
}
```

## API

#### `getDidOpenSettingsForNotification(): Promise<boolean>`

Returns a promise that indicates whether the app was opened from the notification settings screen. This is useful for responding to requests that occur while the app is in a killed state.

---

#### `onOpenSettingsForNotification(callback: () => void): EmitterSubscription`

Used to attach a listener to the open notification settings event. This is useful for responding to requests that occur while the app is running in the background.

## Example

Check out the project in the `example` folder for a complete integration.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
