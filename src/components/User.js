import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
  Button,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {DataStore} from 'aws-amplify';
import {User} from '../models';

const UserComponent = ({user, navigation, fetchUsers}) => {
  const [editUser, setEditUser] = useState({...user});
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = val => {
    setEditUser(val);
  };

  const toggleEdit = () => {
    setIsEditing(previousState => !previousState);
  };

  const handleSave = () => {
    // TODO: save data mutation
    toggleEdit();
  };

  const handleCancel = () => {
    toggleEdit();
  };

  async function handleDelete() {
    try {
      const thisUser = await DataStore.query(User, user.id);
      DataStore.delete(thisUser);
      console.log(`Successfully deleted user:`, thisUser);
      fetchUsers();
    } catch (err) {
      console.error('something went wrong with handleDelete:', err);
    }
  }

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        navigation.navigate('Profile', {
          user: user,
        });
      }}>
      {isEditing ? (
        <View>
          <Text style={styles.formLabel}>Username</Text>
          <TextInput
            style={styles.editUserInput}
            onChangeText={val => handleEdit({...editUser, username: val})}>
            {editUser.username}
          </TextInput>
          <View style={styles.editOptionsContainer}>
            <Pressable style={styles.icon} onPress={handleCancel}>
              <MaterialCommunityIcons
                name="cancel"
                color={'#6e1701'}
                size={30}
              />
              <Text style={styles.cancelLabel}>Cancel</Text>
            </Pressable>
            <Pressable style={styles.icon} onPress={handleSave}>
              <MaterialCommunityIcons
                name="cloud-check"
                color={'#1b494a'}
                size={30}
              />
              <Text style={styles.saveLabel}>Save</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <View>
          <Text style={styles.bigText}>{user.username}</Text>
          <View style={styles.commentContainer}>
            <Pressable
              onPress={() => {
                navigation.navigate('User', {
                  user: user,
                });
              }}
            />
          </View>
          <View style={styles.btnContainer}>
            <Button
              title={'View profile'}
              color="#000"
              onPress={() => {
                navigation.navigate('Profile', {
                  user: user,
                });
              }}
            />
            <Button
              title={'Delete user'}
              color="#940005"
              onPress={handleDelete}
            />
          </View>
        </View>
      )}
    </Pressable>
  );
};
const styles = StyleSheet.create({
  container: {
    minHeight: 100,
    marginVertical: 10,
    borderColor: 'rgba(0,0,0,.2)',
    borderWidth: 5,
    borderRadius: 10,
    marginHorizontal: 10,
    display: 'flex',
    justifyContent: 'center',
    padding: 20,
  },
  smallText: {
    marginTop: 5,
    fontSize: 15,
    color: 'black',
  },
  bigText: {
    fontSize: 20,
    color: 'black',
  },
  editUserInput: {
    fontSize: 20,
    color: 'black',
    backgroundColor: 'white',
    borderColor: 'black',
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  icon: {
    marginRight: 10,
    display: 'flex',
    alignItems: 'center',
  },
  editOptionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  formLabel: {
    marginTop: 10,
    marginBottom: 5,
  },
  saveLabel: {
    fontSize: 15,
    color: '#1b494a',
  },
  cancelLabel: {
    fontSize: 15,
    color: '#6e1701',
  },
});

export default UserComponent;
