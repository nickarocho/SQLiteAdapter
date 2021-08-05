import React from 'react';
import {View, Text} from 'react-native';
import {Authenticator} from 'aws-amplify-react-native';
import awsconfig from '../../src/aws-exports';

const Authenticator = ({navigation}) => {
  return (
    <Authenticator
      // Optionally hard-code an initial state
      authState="signIn"
      // Pass in an already authenticated CognitoUser or FederatedUser object
      authData={CognitoUser | 'username'}
      // Fired when Authentication State changes
      onStateChange={authState => console.log(authState)}
      // Pass in an aws-exports configuration
      amplifyConfig={awsconfig}
      // Default components can be customized/passed in as child components.
      // Define them here if you used hideDefault={true}
    >
      <Greetings />
      <SignIn federated={myFederatedConfig} />
      <ConfirmSignIn />
      <RequireNewPassword />
      <SignUp />
      <ConfirmSignUp />
      <VerifyContact />
      <ForgotPassword />
      <TOTPSetup />
      <Loading />
    </Authenticator>
  );
};

const styles = StyleSheet.create({});

export default Authenticator;
