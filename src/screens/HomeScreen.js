import React from 'react';
import {Text, StyleSheet, View, Button} from 'react-native';

const HomeScreen = ({navigation}) => {
  return (
    <View>
      <Text style={styles.text}>HomeScreen</Text>
      <Button
        onPress={() => navigation.navigate('Posts')}
        title="Posts"
        color="#000000"
        style={styles.btn}
        testID="btn-navigate-posts"
      />
      <Button
        onPress={() => navigation.navigate('NewPost')}
        title="Create a New Post"
        color="#000000"
        style={styles.btn}
        testID="btn-navigate-new-post"
      />
      <Button
        onPress={() => navigation.navigate('Users')}
        title="Users"
        color="#000000"
        style={styles.btn}
        testID="btn-navigate-users"
      />
      <Button
        onPress={() => navigation.navigate('NewUser')}
        title="Create a New User"
        color="#000000"
        style={styles.btn}
        testID="btn-navigate-new-user"
      />
      <Button
        onPress={() => navigation.navigate('PostEditors')}
        title="Post Editors"
        color="#000000"
        style={styles.btn}
        testID="btn-navigate-post-editors"
      />
      <Button
        onPress={() => navigation.navigate('Auth')}
        title="Sign In"
        color="#000000"
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
