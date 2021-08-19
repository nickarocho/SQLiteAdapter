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
  const [editedProfile, setEditedProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [notification, setNotification] = useContext(NotificationContext);

  const fetchProfile = useCallback(async () => {
    const profile = await DataStore.query(Profile, user.profileID);
    setEditedProfile(profile);
  }, [user.profileID]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const toggleEditProfileSwitch = () => {
    if (isEditing) {
      Alert.alert(
        'Save your changes?',
        `Do you want to save all the changes you've made to this profile?`,
        [
          {
            text: 'Save',
            onPress: () => {
              handleUpdateProfile(editedProfile.id);
              setIsEditing(previousState => !previousState);
            },
            style: 'destructive',
          },
          {
            text: 'Cancel',
            onPress: () => {
              setIsEditing(previousState => !previousState);
              setEditedProfile({
                ...user.profile,
              });
            },
            style: 'cancel',
          },
        ],
      );
    } else {
      setIsEditing(previousState => !previousState);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const originalUser = await DataStore.query(User, user.id);
      await DataStore.save(
        User.copyOf(originalUser, updated => {
          updated.username = editedUser.username;
        }),
      ).then(updated => {
        setEditedUser({
          ...updated,
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
        console.log({updated});
        setEditedProfile({
          ...updated,
          avatar: {...updated.avatar},
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
        <Text style={styles.editProfileLabel}>Edit Profile</Text>
        <Switch
          testID="switch-toggle-edit-user-profile"
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEditing ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleEditProfileSwitch}
          value={isEditing}
        />
      </View>

      {isEditing ? (
        <View style={styles.profileContainer}>
          <Text style={styles.listLabel}>Username</Text>
          <TextInput
            style={styles.editInput}
            onChangeText={val => setEditedUser({...editedUser, username: val})}
            value={editedUser.username}
            showSoftInputOnFocus={false}
            testID="edit-profile-username"
          />

          <Text style={styles.listLabel}>First name</Text>
          <TextInput
            style={styles.editInput}
            onChangeText={val => handleEdit({...editedProfile, firstName: val})}
            value={editedProfile.firstName}
            showSoftInputOnFocus={false}
            testID="edit-profile-firstName"
          />

          <Text style={styles.listLabel}>Last name</Text>
          <TextInput
            style={styles.editInput}
            onChangeText={val => handleEdit({...editedProfile, lastName: val})}
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
        <View style={styles.profileContainer}>
          <Text style={styles.listLabel}>Username</Text>
          <Text style={styles.bigText} testID="saved-profile-username">
            {editedUser.username}
          </Text>

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
