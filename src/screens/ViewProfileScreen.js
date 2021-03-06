import React, {useContext, useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  Switch,
  Alert,
  SafeAreaView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {User, Profile} from '../models';
import {DataStore} from 'aws-amplify';
import NotificationContext from '../context/NotificationContext';

const ViewProfileScreen = props => {
  const {user} = props.route.params;
  const {navigation} = props;
  const [editedUser, setEditedUser] = useState({...user});
  const [editedProfile, setEditedProfile] = useState({
    id: '',
    firstName: '',
    lastName: '',
    avatar: {
      url: '',
      label: '',
    },
  });
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [notification, setNotification] = useContext(NotificationContext);

  const fetchProfile = useCallback(async () => {
    try {
      const profile = await DataStore.query(Profile, user.profileID);
      if (!profile) {
        setNotification({
          ...notification,
          message: 'No profile found with this user.',
          type: 'error',
          active: true,
        });
        return;
      }
      setEditedProfile({
        id: profile.id,
        firstName: profile.firstName,
        lastName: profile.lastName,
        avatar: {
          url: profile.avatar ? profile.avatar.url : '',
          label: profile.avatar ? profile.avatar.label : '',
        },
      });
    } catch (err) {
      console.error('There was a problem with fetchProfile: ' + err);
      setNotification({
        ...notification,
        message: 'fetchProfile error: ' + err,
        type: 'error',
        active: true,
      });
    }
  }, [user.profileID, notification, setNotification]);

  useEffect(() => {
    fetchProfile();
  }, []);

  const toggleEditSwitch = (toggleType = 'profile') => {
    if (isEditingProfile || isEditingUsername) {
      Alert.alert(
        'Save your changes?',
        `Do you want to save all the changes you've made to this ${toggleType}?`,
        [
          {
            text: 'Save',
            onPress: () => {
              if (toggleType === 'profile') {
                handleUpdateProfile(editedProfile.id);
                setIsEditingProfile(previousState => !previousState);
              } else {
                handleUpdateUsername(editedProfile.id);
                setIsEditingUsername(previousState => !previousState);
              }
            },
            style: 'destructive',
          },
          {
            text: 'Cancel',
            onPress: () => {
              if (toggleType === 'profile') {
                setIsEditingProfile(previousState => !previousState);
                setEditedProfile({
                  ...editedProfile,
                });
              } else {
                setIsEditingUsername(previousState => !previousState);
                setEditedUser({
                  ...user,
                });
              }
            },
            style: 'cancel',
          },
        ],
      );
    } else {
      if (toggleType === 'profile') {
        setIsEditingProfile(previousState => !previousState);
      } else {
        setIsEditingUsername(previousState => !previousState);
      }
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const originalProfile = await DataStore.query(Profile, user.profileID);
      await DataStore.save(
        Profile.copyOf(originalProfile, updated => {
          updated.firstName = editedProfile.firstName;
          updated.lastName = editedProfile.lastName;
          updated.avatar.url = editedProfile.avatar.url;
          updated.avatar.label = editedProfile.avatar.label;
        }),
      ).then(updated => {
        setEditedProfile({
          firstName: updated.firstName,
          lastName: updated.lastName,
          avatar: {
            url: updated.avatar.url,
            label: updated.avatar.label,
          },
        });
        setNotification({
          ...notification,
          message: 'Successfully updated user profile!',
          type: 'success',
          active: true,
        });
      });
    } catch (err) {
      console.error(
        'something went wrong with handleUpdateProfile - updating profile',
        err,
      );
      setNotification({
        ...notification,
        message: 'Error updating profile: ' + err.message,
        type: 'error',
        active: true,
      });
    }
  };

  const handleUpdateUsername = async () => {
    try {
      const originalUser = await DataStore.query(User, user.id);
      await DataStore.save(
        User.copyOf(originalUser, updated => {
          updated.username = editedUser.username;
        }),
      ).then(updated => {
        setNotification({
          ...notification,
          message: 'Successfully updated username!',
          type: 'success',
          active: true,
        });
        setEditedUser({
          username: updated.username,
        });
      });
    } catch (err) {
      console.error(
        'something went wrong with handleUpdateProfile - updating username',
        err,
      );
      setNotification({
        ...notification,
        message: 'Error updating username: ' + err.message,
        type: 'error',
        active: true,
      });
    }
  };

  const handleEdit = val => {
    setEditedProfile(val);
  };

  return (
    <ScrollView style={styles.container}>
      <Pressable
        style={styles.backContainer}
        testID="navigate-back-all-users"
        onPress={() => navigation.navigate('UsersScreen')}>
        <MaterialCommunityIcons name="arrow-left" size={20} />
        <Text style={styles.back}>All users</Text>
      </Pressable>

      <View style={styles.editContainer}>
        <Text style={styles.editProfileLabel}>Edit Username</Text>
        <Switch
          testID="switch-toggle-edit-username"
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEditingUsername ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => toggleEditSwitch('username')}
          value={isEditingUsername}
        />
      </View>

      <View style={styles.profileContainer}>
        {isEditingUsername ? (
          <View>
            <Text style={styles.listLabel}>Username</Text>
            <TextInput
              style={styles.editInput}
              onChangeText={val =>
                setEditedUser({...editedUser, username: val})
              }
              value={editedUser.username}
              showSoftInputOnFocus={false}
              testID="edit-profile-username"
            />
          </View>
        ) : (
          <View>
            <Text style={styles.listLabel}>Username</Text>
            <Text style={styles.bigText} testID="saved-profile-username">
              {editedUser.username}
            </Text>
          </View>
        )}

        <View style={styles.editContainer}>
          <Text style={styles.editProfileLabel}>Edit Profile</Text>
          <Switch
            testID="switch-toggle-edit-profile"
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isEditingProfile ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => toggleEditSwitch('profile')}
            value={isEditingProfile}
          />
        </View>

        {isEditingProfile ? (
          <View>
            <Text style={styles.listLabel}>First name</Text>
            <TextInput
              style={styles.editInput}
              onChangeText={val =>
                handleEdit({...editedProfile, firstName: val})
              }
              value={editedProfile.firstName}
              showSoftInputOnFocus={false}
              testID="edit-profile-firstName"
            />

            <Text style={styles.listLabel}>Last name</Text>
            <TextInput
              style={styles.editInput}
              onChangeText={val =>
                handleEdit({...editedProfile, lastName: val})
              }
              value={editedProfile.lastName}
              showSoftInputOnFocus={false}
              testID="edit-profile-lastName"
            />

            <Text style={styles.listLabel}>Avatar URL</Text>
            <TextInput
              style={styles.editInput}
              onChangeText={val =>
                handleEdit({
                  ...editedProfile,
                  avatar: {...editedProfile.avatar, url: val},
                })
              }
              value={editedProfile.avatar.url}
              showSoftInputOnFocus={false}
              testID="edit-profile-avatarURL"
            />

            <Text style={styles.listLabel}>Avatar label</Text>
            <TextInput
              style={styles.editInput}
              onChangeText={val =>
                handleEdit({
                  ...editedProfile,
                  avatar: {...editedProfile.avatar, label: val},
                })
              }
              value={editedProfile.avatar.label}
              showSoftInputOnFocus={false}
              testID="edit-profile-avatarLabel"
            />
          </View>
        ) : (
          // Default view - not editing
          <View>
            <Text style={styles.listLabel}>First name</Text>
            <Text style={styles.bigText} testID="saved-profile-firstName">
              {editedProfile.firstName}
            </Text>

            <Text style={styles.listLabel}>Last name</Text>
            <Text style={styles.bigText} testID="saved-profile-lastName">
              {editedProfile.lastName}
            </Text>

            <Text style={styles.listLabel}>Avatar URL</Text>
            <Text style={styles.bigText} testID="saved-profile-avatarURL">
              {editedProfile.avatar?.url}
            </Text>

            <Text style={styles.listLabel}>Avatar label</Text>
            <Text style={styles.bigText} testID="saved-profile-avatarLabel">
              {editedProfile.avatar?.label}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.postsContainer}>
        <Text style={styles.commentLabel}>
          Posts ({editedUser.posts ? editedUser.posts.length : '0'})
        </Text>
        {editedUser.posts && (
          <SafeAreaView>
            <ScrollView>
              {editedUser.posts.map((item, index) => {
                <Text>{item.title}</Text>;
              })}
            </ScrollView>
          </SafeAreaView>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 100,
    marginVertical: 10,
    marginHorizontal: 10,
    display: 'flex',
    padding: 20,
  },
  bigText: {
    fontSize: 20,
    color: 'black',
  },
  listLabel: {
    marginTop: 25,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  editContainer: {display: 'flex', alignItems: 'flex-end'},
  editProfileLabel: {
    textAlign: 'right',
    marginBottom: 10,
  },
  editInput: {
    fontSize: 20,
    color: 'black',
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 20,
  },
  commentLabel: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
    marginVertical: 10,
  },
  postsContainer: {
    marginVertical: 10,
  },
  backContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  back: {
    color: '#000',
    textDecorationLine: 'underline',
    fontSize: 18,
    marginLeft: 5,
  },
});

export default ViewProfileScreen;
