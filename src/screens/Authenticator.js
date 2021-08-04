import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  SafeAreaView,
} from 'react-native';
import PostComponent from '../components/Post';
import {Authenticator} from 'aws-amplify-react-native';

import {DataStore} from 'aws-amplify';
import {Post, Comment} from '../models';

const PostsScreen = ({navigation}) => {
  const [posts, updatePosts] = useState([]);

  useEffect(() => {
    fetchPosts();
    const postSubscription = DataStore.observe(Post).subscribe(async () => {
      try {
        fetchPosts();
      } catch (err) {
        console.error('Error fetching posts: ', err);
      }
    });

    // TODO: get comment count updates... this isn't working
    // const commentSubscription = DataStore.observe(Comment).subscribe(
    //   async () => {
    //     try {
    //       alert('newComment!');
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   },
    // );
    return () => {
      postSubscription.unsubscribe();
      // commentSubscription.unsubscribe();
    };
  }, []);

  const fetchPosts = async () => {
    try {
      const allPosts = await DataStore.query(Post);
      console.log({allPosts});

      // merge Post model with Comment model
      Promise.all(
        allPosts.map(async post => {
          let id = post.id;
          const comments = (await DataStore.query(Comment)).filter(
            c => c.post.id === id,
          );
          return {...post, comments};
        }),
      ).then(syncedPosts => {
        // store the merged data in state
        // getting the newest post first... TODO: should do this in the query
        updatePosts(syncedPosts.reverse());
      });
    } catch (err) {
      console.error('something went wrong with fetchPosts:', err);
    }
  };

  return (
    <Authenticator
      // Optionally hard-code an initial state
      authState="signIn"
      // Pass in an already authenticated CognitoUser or FederatedUser object
      authData={CognitoUser | 'username'}
      // Fired when Authentication State changes
      onStateChange={authState => console.log(authState)}
      // An object referencing federation and/or social providers
      // The federation here means federation with the Cognito Identity Pool Service
      // *** Only supported on React/Web (Not React Native) ***
      // For React Native use the API Auth.federatedSignIn()
      federated={myFederatedConfig}
      // A theme object to override the UI / styling
      theme={myCustomTheme}
      // Hide specific components within the Authenticator
      // *** Only supported on React/Web (Not React Native)  ***
      hide={[
        Greetings,
        SignIn,
        ConfirmSignIn,
        RequireNewPassword,
        SignUp,
        ConfirmSignUp,
        VerifyContact,
        ForgotPassword,
        TOTPSetup,
        Loading,
      ]}
      // or hide all the default components
      hideDefault={true}
      // Pass in an aws-exports configuration
      amplifyConfig={myAWSExports}
      // Pass in a message map for error strings
      errorMessage={myMessageMap}>
      // Default components can be customized/passed in as child components. //
      Define them here if you used hideDefault={true}
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

const styles = StyleSheet.create({
  headingContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#2b2b2b',
  },
  textStyle: {
    marginVertical: 50,
    fontSize: 25,
  },
  heading: {
    fontSize: 25,
    color: 'white',
  },
  addPostBtn: {
    borderRadius: 500,
    color: 'white',
  },
  addPostBtnText: {
    color: 'white',
    fontSize: 40,
  },
});

export default PostsScreen;
