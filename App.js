import * as React from 'react';
import Amplify, {DataStore, AuthModeStrategyType} from 'aws-amplify';
import awsconfig from './src/aws-exports.js';

import {NavigationContainer} from '@react-navigation/native';
import NavigationTabs from './src/navigation/NavigationTabs';

Amplify.configure(awsconfig);

DataStore.configure({
  authModeStrategyType: AuthModeStrategyType.MULTI_AUTH,
});

export default function App() {
  return (
    <NavigationContainer>
      <NavigationTabs />
    </NavigationContainer>
  );
}
