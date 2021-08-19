import * as React from 'react';
import {useState} from 'react';
import Amplify, {DataStore, AuthModeStrategyType, Hub} from 'aws-amplify';
import awsconfig from './src/aws-exports.js';

import {NavigationContainer} from '@react-navigation/native';
import NavigationTabs from './src/navigation/NavigationTabs';
import NotificationContext from './src/context/NotificationContext.js';

import {LogBox} from 'react-native';
import NotificationComponent from './src/components/Notification.js';
import {useEffect} from 'react';
// LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();

Amplify.configure(awsconfig);
// Amplify.Logger.LOG_LEVEL = 'DEBUG';

DataStore.configure({
  authModeStrategyType: AuthModeStrategyType.MULTI_AUTH,
  errorHandler: err => {
    console.log('custom error handler: ', err);
  },
});

export default function App() {
  const notificationHook = useState({
    message: '',
    type: 'default', // default, error, success
    active: false,
  });
  const [datastoreReady, setDatastoreReady] = useState(false);

  useEffect(() => {
    const listener = startHub();
    return () => listener && listener();
  });

  function startHub() {
    const listener = Hub.listen(
      'datastore',
      async ({payload, payload: {event}}) => {
        console.log('DataStore HUB', event, payload);
        if (event === 'ready') {
          setDatastoreReady(true);
          listener();
        }
      },
    );

    return listener;
  }

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
