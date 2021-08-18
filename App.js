import * as React from 'react';
import {useState} from 'react';
import Amplify, {DataStore, AuthModeStrategyType} from 'aws-amplify';
import awsconfig from './src/aws-exports.js';

import {NavigationContainer} from '@react-navigation/native';
import NavigationTabs from './src/navigation/NavigationTabs';
import NotificationContext from './src/context/NotificationContext.js';

import {LogBox} from 'react-native';
import NotificationComponent from './src/components/Notification.js';
// LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();

Amplify.configure(awsconfig);

DataStore.configure({
  authModeStrategyType: AuthModeStrategyType.MULTI_AUTH,
});

export default function App() {
  const notificationHook = useState({
    message: '',
    type: 'default',
    active: false,
  });
  return (
    <NotificationContext.Provider value={notificationHook}>
      <NavigationContainer>
        <NavigationTabs />
      </NavigationContainer>
      <NotificationComponent
        message={notificationHook.message}
        type={notificationHook.type}
        active={notificationHook.active}
      />
    </NotificationContext.Provider>
  );
}
