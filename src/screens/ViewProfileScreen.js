import React, {useState} from 'react';
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

const ViewProfileScreen = props => {
  console.log({props});
  const {user} = props.route.params;
  const {navigation} = props;
  const [editedUser, setEditedUser] = useState({...user});
  const [editedProfile, setEditedProfile] = useState({...user.profile});
  const [isEditing, setIsEditing] = useState(false);

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

      const originalProfile = await DataStore.query(Profile, user.profile.id);
      await DataStore.save(
        Profile.copyOf(originalProfile, updated => {
          Object.assign(updated, editedProfile);
          updated.avatar = {...editedProfile.avatar};
        }),
      ).then(updated => {
        setEditedProfile({
          ...updated,
          avatar: {...updated.avatar},
        });
      });
    } catch (err) {
      console.error('something went wrong with handleUpdateProfile', err);
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
        onPress={() => navigation.navigate('Users')}>
        <MaterialCommunityIcons name="arrow-left" size={20} />
        <Text style={styles.back}>All users</Text>
      </Pressable>

      <Text style={styles.editProfileLabel}>Edit Profile</Text>
      <Switch
        testID={`switch-toggle-edit-user-profile-${user.id}`}
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEditing ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleEditProfileSwitch}
        value={isEditing}
      />

      {isEditing ? (
        <View style={styles.profileContainer}>
          <Text style={styles.listLabel}>Username</Text>
          <TextInput
            style={styles.editInput}
            onChangeText={val => setEditedUser({...editedUser, username: val})}
            value={editedUser.username}
          />

          <Text style={styles.listLabel}>First name</Text>
          <TextInput
            style={styles.editInput}
            onChangeText={val => handleEdit({...editedProfile, firstName: val})}
            value={editedProfile.firstName}
          />

          <Text style={styles.listLabel}>Last name</Text>
          <TextInput
            style={styles.editInput}
            onChangeText={val => handleEdit({...editedProfile, lastName: val})}
            value={editedProfile.lastName}
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
          />
        </View>
      ) : (
        // Default view - not editing
        <View style={styles.profileContainer}>
          <Text style={styles.listLabel}>Username</Text>
          <Text style={styles.bigText}>{editedUser.username}</Text>

          <Text style={styles.listLabel}>First name</Text>
          <Text style={styles.bigText}>{editedProfile.firstName}</Text>

          <Text style={styles.listLabel}>Last name</Text>
          <Text style={styles.bigText}>{editedProfile.lastName}</Text>

          <Text style={styles.listLabel}>Avatar URL</Text>
          <Text style={styles.bigText}>{editedProfile.avatar?.url}</Text>

          <Text style={styles.listLabel}>Avatar label</Text>
          <Text style={styles.bigText}>{editedProfile.avatar?.label}</Text>
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
  editProfileLabel: {
    textAlign: 'right',
  },
  editInput: {
    fontSize: 20,
    color: 'black',
    backgroundColor: '#fff',
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
