import * as React from 'react';

import {StyleSheet} from 'react-native';
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
        testID={'tab-posts'}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="layers-triple"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Users"
        component={UsersStackScreen}
        testID={'tab-users'}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="account-group"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Post Editors"
        component={PostEditorsScreen}
        testID={'tab-post-editors'}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="account-edit"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Log In"
        component={AuthScreen}
        testID={'tab-login'}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="login" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'yellow',
  },
});

export default NavigationTabs;
