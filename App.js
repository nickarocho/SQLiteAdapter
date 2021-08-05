import * as React from 'react';
import Amplify from 'aws-amplify';
import awsconfig from './src/aws-exports.js';

import {createAppContainer} from 'react-navigation';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from 'react-navigation-stack';

import HomeScreen from './src/screens/HomeScreen';
import PostsScreen from './src/screens/PostsScreen';
import NewPostScreen from './src/screens/NewPostScreen';
import ViewPostScreen from './src/screens/ViewPostScreen.js';
import UsersScreen from './src/screens/UsersScreen';
import NewUserScreen from './src/screens/NewUserScreen';
import Authenticator from './src/screens/Authenticator.js';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

Amplify.configure(awsconfig);

// TODO: create tabs or a side drawer nav menu
const Tab = createBottomTabNavigator();
const Tabs = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Posts"
          component={PostsScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="apps" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="New Post"
          component={NewPostScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="plus-circle"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Post"
          component={ViewPostScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="post" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Posts: PostsScreen,
    NewPost: NewPostScreen,
    Post: ViewPostScreen,
    Users: UsersScreen,
    NewUser: NewUserScreen,
    Auth: Authenticator,
  },
  {
    initialRouteName: 'Home',
  },
);

// export default withAuthenticator(createAppContainer(navigator), {
//   // Render a sign out button once logged in
//   includeGreetings: true,
// });

export default createAppContainer(navigator);
