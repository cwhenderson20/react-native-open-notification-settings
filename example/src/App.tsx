import * as React from 'react';
import { Alert, Button, StyleSheet, View } from 'react-native';
import {
  getDidOpenSettingsForNotification,
  onOpenSettingsForNotification,
} from 'react-native-open-notification-settings';
import { requestNotifications } from 'react-native-permissions';

export default function App() {
  React.useEffect(() => {
    getDidOpenSettingsForNotification().then((res) => {
      if (res) {
        showAlert();
      }
    });

    const listener = onOpenSettingsForNotification(() => {
      showAlert();
    });

    function showAlert() {
      Alert.alert('Opened settings for notification');
    }

    return () => {
      listener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Button
        title="Request permissions"
        onPress={() => {
          requestNotifications([
            'alert',
            'sound',
            'badge',
            'providesAppSettings',
          ]).then((response) => {
            Alert.alert(JSON.stringify(response));
          });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
