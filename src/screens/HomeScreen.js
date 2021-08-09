import React from 'react';
import {Text, StyleSheet, View, Button} from 'react-native';

const HomeScreen = ({navigation}) => {
  return (
    <View>
      <Button
        onPress={() => navigation.navigate('Posts')}
        title="Posts"
        color="#2b2b2b"
        style={styles.btn}
        testID="btn-navigate-posts"
      />
      <Button
        onPress={() => navigation.navigate('NewPost')}
        title="Create a New Post"
        color="#2b2b2b"
        style={styles.btn}
        testID="btn-navigate-new-post"
      />
      <Button
        onPress={() => navigation.navigate('Users')}
        title="Users"
        color="#2b2b2b"
        style={styles.btn}
        testID="btn-navigate-users"
      />
      <Button
        onPress={() => navigation.navigate('NewUser')}
        title="Create a New User"
        color="#2b2b2b"
        style={styles.btn}
        testID="btn-navigate-new-user"
      />
      <Button
        onPress={() => navigation.navigate('PostEditors')}
        title="Post Editors"
        color="#2b2b2b"
        style={styles.btn}
        testID="btn-navigate-post-editors"
      />
      <Button
        onPress={() => navigation.navigate('Auth')}
        title="Sign In"
        color="#2b2b2b"
        style={styles.btn}
        testID="btn-navigate-post-editors"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
  btn: {
    marginVertical: 30,
  },
});

export default HomeScreen;
