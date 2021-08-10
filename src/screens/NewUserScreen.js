import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
} from 'react-native';

import {DataStore} from 'aws-amplify';
import {User, Profile} from '../models';

const NewUserScreen = ({navigation}) => {
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
      const savedProfile = await DataStore.save(new Profile({...newProfile}));
      const savedUser = await DataStore.save(
        new User({...newUser, profile: savedProfile}),
      );
    } catch (err) {
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
        <Text style={styles.heading}>🖋 Create a New User</Text>
      </View>

      <View style={styles.newUserContainer}>
        <Text style={styles.formLabel}>Username</Text>
        <TextInput
          style={styles.input}
          onChangeText={val => handleEditUser({username: val})}
          value={newUser.username}
          placeholder="joeshmoe"
        />

        <Text style={styles.formLabel}>First name</Text>
        <TextInput
          style={styles.input}
          onChangeText={val =>
            handleEditProfile({...newProfile, firstName: val})
          }
          value={newProfile.firstName}
          placeholder="Joe"
        />

        <Text style={styles.formLabel}>Last name</Text>
        <TextInput
          style={styles.input}
          onChangeText={val =>
            handleEditProfile({...newProfile, lastName: val})
          }
          value={newProfile.lastName}
          placeholder="Shmoe"
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
  newUserContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
    paddingHorizontal: 20,
    padding: 10,
    fontSize: 20,
  },
  formLabel: {
    color: '#000000',
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
  },
});

export default NewUserScreen;
