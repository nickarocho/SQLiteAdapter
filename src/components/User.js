import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const User = ({user, navigation}) => {
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

  const handleDelete = () => {
    Alert.alert(
      'Delete User',
      `Are you sure you want to delete this user? There's no going back...`,
      [
        {
          text: 'Yes, delete forever',
          onPress: () => {
            // TODO: delete the user
            console.log('Deleting user...');
          },
          style: 'destructive',
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
    );
  };

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        navigation.navigate('User', {
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
            <Pressable style={styles.icon} onPress={handleDelete}>
              <MaterialCommunityIcons
                name="delete"
                color={'#6e1701'}
                size={30}
              />
            </Pressable>
            <Pressable style={styles.icon} onPress={toggleEdit}>
              <MaterialCommunityIcons
                name="pencil"
                color={'#1b494a'}
                size={30}
              />
            </Pressable>
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

export default User;
