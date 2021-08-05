import React from 'react';
import {View, Text, StyleSheet, Pressable, Button} from 'react-native';

import {DataStore} from 'aws-amplify';
import {User} from '../models';

const UserComponent = ({user, navigation, fetchUsers}) => {
  const handleDeleteUser = async () => {
    try {
      const thisUser = await DataStore.query(User, user.id);
      DataStore.delete(thisUser);
      fetchUsers();
    } catch (err) {
      console.error('something went wrong with handleDeleteUser:', err);
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
        <Text style={styles.bigText}>{user.username}</Text>
        <View style={styles.btnContainer}>
          <Button
            title={'View profile'}
            color="#000"
            testID={`btn-view-user-${user.id}`}
            onPress={() => {
              navigation.navigate('Profile', {
                user: user,
              });
            }}
          />
          <Button
            title={'Delete user'}
            color="#940005"
            testID={`btn-delete-user-${user.id}`}
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
