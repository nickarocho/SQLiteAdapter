import React, {useContext} from 'react';
import {View, Text, StyleSheet, Pressable, Button} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {DataStore} from 'aws-amplify';
import {User} from '../models';
import NotificationContext from '../context/NotificationContext';

const UserComponent = ({user, navigation, fetchUsers}) => {
  const [notification, setNotification] = useContext(NotificationContext);
  const handleDeleteUser = async () => {
    try {
      const thisUser = await DataStore.query(User, user.id);
      DataStore.delete(thisUser);
      setNotification({
        ...notification,
        message: 'Successfully deleted user!',
        type: 'success',
        active: true,
      });
      fetchUsers();
    } catch (err) {
      console.error('something went wrong with handleDeleteUser:', err);
      setNotification({
        ...notification,
        message: 'Error deleting user: ' + err.message,
        type: 'error',
        active: true,
      });
    }
  };

  return (
    <Pressable
      style={styles.container}
      testID={`user-${user.id}`}
      onPress={() => {
        navigation.navigate('Profile', {
          user: user,
        });
      }}>
      <View>
        <View style={styles.usernameContainer}>
          <MaterialCommunityIcons
            name="account-circle"
            color={'#2b2b2b'}
            size={26}
            style={styles.userIcon}
          />
          <Text style={styles.bigText}>{user.username}</Text>
        </View>
        <View style={styles.btnContainer}>
          <Button
            title={'View profile'}
            color="#2B2B2B"
            testID={`btn-view-user-${user.userIndex}`}
            onPress={() => {
              navigation.navigate('Profile', {
                user: user,
              });
            }}
          />
          <Button
            title={'Delete user'}
            color="#940005"
            testID={`btn-delete-user-${user.userIndex}`}
            onPress={handleDeleteUser}
          />
        </View>
      </View>
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
  usernameContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  userIcon: {
    marginRight: 5,
  },
  bigText: {
    fontSize: 20,
    color: 'black',
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
});

export default UserComponent;
