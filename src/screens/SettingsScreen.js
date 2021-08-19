import React, {useState, useCallback, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Button,
  Switch,
  SafeAreaView,
  Pressable,
} from 'react-native';
import NotificationContext from '../context/NotificationContext';
import {DataStore} from '@aws-amplify/datastore';
import {Post, User, PostEditor} from '../models';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const NewPostScreen = ({navigation}) => {
  const [notification, setNotification] = useContext(NotificationContext);

  const clearDataStore = () => {
    DataStore.clear();
    setNotification({
      ...notification,
      message: 'DataStore successfully cleared.',
      type: 'default',
      active: true,
    });
  };

  return (
    <ScrollView testID="new-post-body">
      <View style={styles.bodyContainer}>
        <Button
          onPress={clearDataStore}
          testID="btn-clear-datastore"
          title="Clear DataStore"
          color="#2b2b2b"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  bodyContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
    paddingHorizontal: 20,
    padding: 10,
    fontSize: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100%',
  },
});

export default NewPostScreen;
