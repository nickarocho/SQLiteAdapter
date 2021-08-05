import * as React from 'react';
import Amplify from 'aws-amplify';
import awsconfig from './src/aws-exports.js';

//Import React Navigation - Tabs
import {NavigationContainer} from '@react-navigation/native';
import NavigationTabs from './src/navigation/NavigationTabs';

//Import React Navigation - v3 stack
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import HomeScreen from './src/screens/HomeScreen';
import PostsScreen from './src/screens/PostsScreen';
import NewPostScreen from './src/screens/NewPostScreen';
import ViewPostScreen from './src/screens/ViewPostScreen.js';
import UsersScreen from './src/screens/UsersScreen';
import ViewProfileScreen from './src/screens/ViewProfileScreen';
import NewUserScreen from './src/screens/NewUserScreen';
import PostEditorsScreen from './src/screens/PostEditorsScreen';
import AuthScreen from './src/screens/AuthScreen.js';

Amplify.configure(awsconfig);

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Posts: PostsScreen,
    NewPost: NewPostScreen,
    Post: ViewPostScreen,
    Users: UsersScreen,
    NewUser: NewUserScreen,
    Profile: ViewProfileScreen,
    PostEditors: PostEditorsScreen,
    Auth: AuthScreen,
  },
  {
    initialRouteName: 'Home',
  },
);

// export default function App() {
//   return (
//     <NavigationContainer>
//       <NavigationTabs />
//     </NavigationContainer>
//   );
// }

export default createAppContainer(navigator);
