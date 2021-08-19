import * as React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import PostsScreen from '../screens/PostsScreen';
import NewPostScreen from '../screens/NewPostScreen';
import ViewPostScreen from '../screens/ViewPostScreen.js';
import UsersScreen from '../screens/UsersScreen';
import ViewProfileScreen from '../screens/ViewProfileScreen';
import NewUserScreen from '../screens/NewUserScreen';
import PostEditorsScreen from '../screens/PostEditorsScreen';
import AuthScreen from '../screens/AuthScreen.js';
import SettingsScreen from '../screens/SettingsScreen.js';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const PostsStack = createStackNavigator();
const PostsStackScreen = () => {
  return (
    <PostsStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <PostsStack.Screen name="PostsScreen" component={PostsScreen} />
      <PostsStack.Screen name="Post" component={ViewPostScreen} />
      <PostsStack.Screen name="NewPost" component={NewPostScreen} />
    </PostsStack.Navigator>
  );
};

const UsersStack = createStackNavigator();
const UsersStackScreen = () => {
  return (
    <UsersStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <UsersStack.Screen name="UsersScreen" component={UsersScreen} />
      <UsersStack.Screen name="Profile" component={ViewProfileScreen} />
      <PostsStack.Screen name="NewUser" component={NewUserScreen} />
    </UsersStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();
const NavigationTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2B2B2B',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#e3e3e3',
        tabBarActiveBackgroundColor: '#0d0d0d',
        tabBarInactiveBackgroundColor: '#2b2b2b',
        tabBarStyle: [
          {
            display: 'flex',
          },
          null,
        ],
      }}>
      <Tab.Screen
        name="Posts"
        component={PostsStackScreen}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="layers-triple"
              color={color}
              size={26}
            />
          ),
          tabBarTestID: 'tab-posts',
          headerTitle: 'All Posts',
        }}
      />
      <Tab.Screen
        name="Users"
        component={UsersStackScreen}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="account-group"
              color={color}
              size={26}
            />
          ),
          tabBarTestID: 'tab-users',
          headerTitle: 'All Users',
        }}
      />
      <Tab.Screen
        name="Post Editors"
        component={PostEditorsScreen}
        options={{
          tabBarTestID: 'hi',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="account-edit"
              color={color}
              size={26}
            />
          ),
          headerTitle: 'All Post Editors',
        }}
      />
      <Tab.Screen
        name="Log In"
        component={AuthScreen}
        tabBarTestID={'tab-login'}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="login" color={color} size={26} />
          ),
          tabBarTestID: 'tab-login',
          headerTitle: 'Log In / Sign Up',
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        tabBarTestID={'tab-settings'}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="cog" color={color} size={26} />
          ),
          tabBarTestID: 'tab-settings',
          headerTitle: 'DataStore & App Settings',
        }}
      />
    </Tab.Navigator>
  );
};

export default NavigationTabs;
