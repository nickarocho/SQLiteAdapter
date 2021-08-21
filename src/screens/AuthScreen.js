import React, {useContext} from 'react';
import {Authenticator} from 'aws-amplify-react-native';
import awsconfig from '../aws-exports';
import NotificationContext from '../context/NotificationContext';

const AuthScreen = () => {
  const [notification, setNotification] = useContext(NotificationContext);

  return (
    <Authenticator
      authState="signIn"
      onStateChange={authState => {
        setNotification({
          ...notification,
          message: 'Auth state: ' + authState,
          type: 'default',
          active: true,
        });
      }}
      amplifyConfig={awsconfig}
    />
  );
};

export default AuthScreen;
