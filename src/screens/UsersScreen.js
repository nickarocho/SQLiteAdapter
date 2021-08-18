import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import UserComponent from '../components/User';

import {DataStore} from 'aws-amplify';
import {User, Profile} from '../models';

const UsersScreen = ({navigation}) => {
  const [users, updateUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
    const userSubscription = DataStore.observe(User).subscribe(async () => {
      try {
        fetchUsers();
      } catch (err) {
        console.error('Error fetching posts: ', err);
      }
    });
    const profileSubscription = DataStore.observe(Profile).subscribe(
      async () => {
        try {
          fetchUsers();
        } catch (err) {
          console.error('Error fetching posts: ', err);
        }
      },
    );
    return () => {
      userSubscription.unsubscribe();
      profileSubscription.unsubscribe();
    };
  }, []);

  const fetchUsers = async () => {
    try {
      const allUsers = await DataStore.query(User);
      updateUsers(allUsers.reverse());
    } catch (err) {
      console.error('something went wrong with fetchUsers:', err);
    }
  };

  return (
    <ScrollView>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>
          All Users (<Text testID="user-count">{users.length}</Text>)
        </Text>
        <Button
          style={styles.addPostBtn}
          onPress={() => navigation.navigate('NewUser')}
          title="✚ New User"
          testID="btn-navigate-new-user"
          color="#2B2B2B"
        />
      </View>
      <SafeAreaView>
        <ScrollView>
          {users.map((item, index) => {
            return (
              <UserComponent
                key={index}
                user={{...item, userIndex: index}}
                style={styles.textStyle}
                navigation={navigation}
                fetchUsers={fetchUsers}
              />
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headingContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  textStyle: {
    marginVertical: 50,
    fontSize: 25,
  },
  heading: {
    fontSize: 25,
    color: 'black',
  },
  addPostBtn: {
    borderRadius: 500,
    color: 'white',
  },
  addPostBtnText: {
    color: 'white',
    fontSize: 40,
  },
});

export default UsersScreen;
