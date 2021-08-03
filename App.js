import * as React from 'react';
import Amplify from 'aws-amplify';
import awsconfig from './src/aws-exports.js';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
import ViewProfileScreen from './src/screens/ViewProfileScreen.js';

Amplify.configure(awsconfig);

const Tab = createBottomTabNavigator();

function Tabs() {
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
}

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Posts: PostsScreen,
    NewPost: NewPostScreen,
    Post: ViewPostScreen,
    Users: UsersScreen,
    NewUser: NewUserScreen,
    Profile: ViewProfileScreen,
  },
  {
    initialRouteName: 'Home',
  },
);

export default createAppContainer(navigator);
