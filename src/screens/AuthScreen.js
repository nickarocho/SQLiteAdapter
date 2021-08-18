import React from 'react';
import {Authenticator} from 'aws-amplify-react-native';
import awsconfig from '../aws-exports';

const AuthScreen = () => {
  return (
    <Authenticator
      authState="signIn"
      // authData={cognitoUser}
      onStateChange={authState => console.log(authState)}
      amplifyConfig={awsconfig}
    />
  );
};

export default AuthScreen;
