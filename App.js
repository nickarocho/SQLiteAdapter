import * as React from 'react';
import {View, Text} from 'react-native';
import Amplify from 'aws-amplify';
import awsconfig from './src/aws-exports.js';

// import {NavigationContainer} from '@react-navigation/native';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
//Import React Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {createAppContainer} from 'react-navigation';

import HomeScreen from './src/screens/HomeScreen';
import PostsScreen from './src/screens/PostsScreen';
import NewPostScreen from './src/screens/NewPostScreen';
import ViewPostScreen from './src/screens/ViewPostScreen.js';
import UsersScreen from './src/screens/UsersScreen';
import NewUserScreen from './src/screens/NewUserScreen';
import PostEditorsScreen from './src/screens/PostEditorsScreen';
import AuthScreen from './src/screens/AuthScreen.js';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

Amplify.configure(awsconfig);

const Tab = createBottomTabNavigator();
function NavigationTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Posts"
        component={PostsScreen}
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
        name="New Post"
        component={NewPostScreen}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="playlist-plus"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Users"
        component={UsersScreen}
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
        name="New User"
        component={NewUserScreen}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="account-plus"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Post Editors"
        component={PostEditorsScreen}
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
    </Tab.Navigator>
  );
}

const RootStack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <RootStack.Navigator>
//         <RootStack.Screen name="Home" component={NavigationTabs} />
//         <RootStack.Screen name="Post" component={ViewPostScreen} />
//       </RootStack.Navigator>
//     </NavigationContainer>
//   );
// }

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Posts: PostsScreen,
    NewPost: NewPostScreen,
    Post: ViewPostScreen,
    Users: UsersScreen,
    NewUser: NewUserScreen,
    Auth: AuthScreen,
  },
  {
    initialRouteName: 'Home',
  },
);
export default createAppContainer(navigator);
