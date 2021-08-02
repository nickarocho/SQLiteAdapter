import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Button,
} from 'react-native';

const NewPostScreen = ({navigation}) => {
  const [newPost, setNewPost] = useState('');
  return (
    <SafeAreaView>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>🖋 Create a New Post</Text>
      </View>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={setNewPost}
          value={newPost}
          placeholder="Create a new post..."
          multiline
          numberOfLines={4}
        />
      </View>
      <Button
        onPress={() => navigation.navigate('Posts')}
        title="Create Post"
        color="#000000"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headingContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20,
  },
  input: {
    marginVertical: 10,
    marginHorizontal: 10,
    paddingHorizontal: 20,
    borderColor: 'rgba(0,0,0,.2)',
    borderWidth: 5,
    borderRadius: 10,
    padding: 10,
    fontSize: 20,
  },
  heading: {
    fontSize: 25,
  },
});

export default NewPostScreen;
