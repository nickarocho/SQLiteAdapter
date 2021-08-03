import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Button,
  Switch,
  FlatList,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

// TODO: get all users from DS
import users from '../utils/users';

const NewPostScreen = ({navigation}) => {
  const [newPost, setNewPost] = useState({
    title: '',
    views: 0,
    metadata: '',
    draft: true,
    rating: 0,
    editors: [],
    comments: [],
  });

  const editorsMap = users.map(u => {
    return {
      id: u.id,
      username: u.username,
      assigned: newPost.editors.includes(u.id),
    };
  });
  const [editors, setEditors] = useState([...editorsMap]);

  const handleEdit = val => {
    setNewPost(val);
  };

  return (
    <SafeAreaView>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>🖋 Create a New Post</Text>
      </View>
      <View style={styles.newPostContainer}>
        <Text style={styles.formLabel}>Post title</Text>
        <TextInput
          style={styles.input}
          onChangeText={val => handleEdit({...newPost, username: val})}
          value={newPost}
          placeholder="Post title"
          multiline
          numberOfLines={4}
        />
        <Text style={styles.formLabel}>Views</Text>
        <TextInput
          style={styles.input}
          onChangeText={val => handleEdit({...newPost, views: val})}
          value={newPost}
          keyboardType={'number-pad'}
          placeholder="Enter a number"
        />
        <Text style={styles.formLabel}>Draft?</Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={newPost.draft ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={val => handleEdit({...newPost, draft: val})}
          value={newPost.draft}
        />
        <Text style={styles.formLabel}>Rating</Text>
        <TextInput
          style={styles.input}
          onChangeText={val => handleEdit({...newPost, rating: val})}
          value={newPost}
          keyboardType={'number-pad'}
          placeholder="0 - 10"
        />
        <FlatList
          keyExtractor={user => user.id}
          data={editors}
          renderItem={({item}) => {
            return (
              <View style={styles.checkboxContainer}>
                <CheckBox
                  disabled={false}
                  style={styles.textStyle}
                  value={item.assigned}
                  onValueChange={newValue => {
                    let updatedEditors = editors.map(editor =>
                      editor.id === item.id
                        ? {
                            ...editor,
                            assigned: newValue,
                          }
                        : editor,
                    );
                    setEditors(updatedEditors);
                    handleEdit({
                      ...newPost,
                      editors: editors.map(editor => editor.id),
                    });
                  }}
                />
                <Text>{item.username}</Text>
              </View>
            );
          }}
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
  newPostContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
    paddingHorizontal: 20,
    borderColor: 'rgba(0,0,0,.2)',
    borderWidth: 5,
    borderRadius: 10,
    padding: 10,
    fontSize: 20,
  },
  formLabel: {
    color: '#000000',
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
  },
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    fontSize: 25,
  },
});

export default NewPostScreen;
