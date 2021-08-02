import Amplify, {DataStore, AuthModeStrategyType} from 'aws-amplify';
import awsconfig from './src/aws-exports.js';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './src/screens/HomeScreen';
import PostsScreen from './src/screens/PostsScreen';
import NewPostScreen from './src/screens/NewPostScreen';
import ViewPostScreen from './src/screens/ViewPostScreen';

Amplify.configure(awsconfig);

DataStore.configure({
  authModeStrategyType: AuthModeStrategyType.MULTI_AUTH,
});

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Posts: PostsScreen,
    NewPost: NewPostScreen,
    Post: ViewPostScreen,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      title: 'App',
    },
  },
);

export default createAppContainer(navigator);
