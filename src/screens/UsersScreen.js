import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  ScrollView,
} from 'react-native';
import User from '../components/User';
import users from '../utils/users';

const UsersScreen = ({navigation}) => {
  return (
    <ScrollView>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Users ({users.length})</Text>
        <Button
          style={styles.addPostBtn}
          onPress={() => navigation.navigate('NewUser')}
          title="✚ New User"
          color="black"
        />
      </View>
      <FlatList
        keyExtractor={user => user.id}
        data={users}
        renderItem={({item}) => {
          return (
            <User
              user={{...item}}
              style={styles.textStyle}
              navigation={navigation}
            />
          );
        }}
      />
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
    backgroundColor: '#2b2b2b',
  },
  textStyle: {
    marginVertical: 50,
    fontSize: 25,
  },
  heading: {
    fontSize: 25,
    color: 'white',
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
