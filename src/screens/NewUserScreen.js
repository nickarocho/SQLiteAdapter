import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  Pressable,
} from 'react-native';

import {DataStore} from 'aws-amplify';
import {User, Profile} from '../models';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NotificationContext from '../context/NotificationContext';

const NewUserScreen = ({navigation}) => {
  const [notification, setNotification] = useContext(NotificationContext);

  const [newUser, setNewUser] = useState({
    username: '',
  });
  const [newProfile, setNewProfile] = useState({
    firstName: '',
    lastName: '',
    avatar: {
      url: '',
      label: '',
    },
  });

  const handleCreateUser = async () => {
    try {
      if (!newUser.username) {
        setNotification({
          ...notification,
          message: 'No username set. Add a username.',
          type: 'error',
          active: true,
        });
        return;
      }
      const savedProfile = await DataStore.save(new Profile({...newProfile}));
      const savedUser = await DataStore.save(
        new User({...newUser, profile: savedProfile}),
      );
      setNotification({
        ...notification,
        message: 'Successfully created new user!',
        type: 'success',
        active: true,
      });
    } catch (err) {
      setNotification({
        ...notification,
        message: 'Error creating new user: ' + err.message,
        type: 'success',
        active: true,
      });
      console.error('Something went wrong with handleCreateUser', err);
    }
    navigation.navigate('UsersScreen');
  };

  const handleEditUser = val => {
    setNewUser(val);
  };

  const handleEditProfile = val => {
    setNewProfile(val);
  };

  return (
    <ScrollView>
      <View style={styles.headingContainer}>
        <Text testID="new-user-dismiss-keyboard-el" style={styles.heading}>
          🖋 Create a New User
        </Text>
      </View>

      <Pressable
        style={styles.backContainer}
        testID="navigate-back-all-users"
        onPress={() => navigation.navigate('UsersScreen')}>
        <MaterialCommunityIcons name="arrow-left" size={20} />
        <Text style={styles.back}>All users</Text>
      </Pressable>

      <View style={styles.newUserContainer}>
        <Text style={styles.formLabel}>Username</Text>
        <TextInput
          style={styles.input}
          onChangeText={val => handleEditUser({username: val})}
          value={newUser.username}
          placeholder="joeshmoe"
          testID="new-user-username-input"
          showSoftInputOnFocus={false}
        />

        <Text style={styles.formLabel}>First name</Text>
        <TextInput
          style={styles.input}
          onChangeText={val =>
            handleEditProfile({...newProfile, firstName: val})
          }
          value={newProfile.firstName}
          placeholder="Joe"
          testID="new-user-first-name-input"
          showSoftInputOnFocus={false}
        />

        <Text style={styles.formLabel}>Last name</Text>
        <TextInput
          style={styles.input}
          onChangeText={val =>
            handleEditProfile({...newProfile, lastName: val})
          }
          value={newProfile.lastName}
          placeholder="Shmoe"
          testID="new-user-last-name-input"
          showSoftInputOnFocus={false}
        />

        <Text style={styles.formLabel}>Avatar URL</Text>
        <TextInput
          style={styles.input}
          onChangeText={val =>
            handleEditProfile({
              ...newProfile,
              avatar: {...newProfile.avatar, url: val},
            })
          }
          value={newProfile.avatar.url}
          placeholder="https://github.com/aws-amplify/amplify-js"
          testID="new-user-avatar-url-input"
          showSoftInputOnFocus={false}
        />

        <Text style={styles.formLabel}>Avatar Label</Text>
        <TextInput
          style={styles.input}
          onChangeText={val =>
            handleEditProfile({
              ...newProfile,
              avatar: {...newProfile.avatar, label: val},
            })
          }
          value={newProfile.avatar.label}
          placeholder="Headshot"
          testID="new-user-avatar-label-input"
          showSoftInputOnFocus={false}
        />
      </View>

      <Button
        onPress={handleCreateUser}
        testID="btn-create-user"
        title="Create User"
        color="#2b2b2b"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 25,
    color: 'black',
  },
  backContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  back: {
    color: '#000',
    textDecorationLine: 'underline',
    fontSize: 18,
    marginLeft: 5,
  },
  newUserContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
    paddingHorizontal: 20,
    padding: 10,
    fontSize: 20,
  },
  formLabel: {
    color: '#000000',
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 20,
  },
});

export default NewUserScreen;
