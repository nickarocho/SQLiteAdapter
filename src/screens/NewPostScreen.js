import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Button,
  Switch,
  FlatList,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {DataStore} from '@aws-amplify/datastore';
import {Post, User} from '../models';

const NewPostScreen = ({navigation}) => {
  const [newPost, setNewPost] = useState({
    title: '',
    views: 0,
    metadata: '{}',
    draft: true,
    rating: 0,
    editors: [],
    comments: [],
  });
  const [editors, setEditors] = useState([]);

  const fetchUsers = useCallback(async () => {
    try {
      const allUsers = await DataStore.query(User);
      // TODO: make this better...
      const editorsMap = allUsers.map(u => {
        return {
          id: u.id,
          username: u.username,
          assigned: false,
        };
      });
      setEditors(editorsMap);
    } catch (err) {
      console.error('something went wrong with fetchComments:', err);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleEdit = val => {
    setNewPost(val);
  };

  async function createPost() {
    if (!newPost.title) return;
    try {
      await DataStore.save(new Post({...newPost}));
      navigation.navigate('Posts');
    } catch (err) {
      console.error('something went wrong with createPost:', err);
    }
  }

  return (
    <ScrollView>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>🖋 Create a New Post</Text>
      </View>

      <View style={styles.newPostContainer}>
        <Text style={styles.formLabel}>Post title</Text>
        <TextInput
          style={styles.input}
          onChangeText={val => handleEdit({...newPost, title: val})}
          value={newPost}
          placeholder="Post title"
          multiline
          numberOfLines={4}
        />

        <Text style={styles.formLabel}>Views</Text>
        <TextInput
          style={styles.input}
          onChangeText={val => {
            const parsedVal = parseInt(val);
            handleEdit({...newPost, views: parsedVal});
          }}
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
          onChangeText={val => {
            const parsedVal = parseInt(val);
            handleEdit({...newPost, rating: parsedVal});
          }}
          value={newPost}
          keyboardType={'number-pad'}
          placeholder="0 - 10"
        />

        <Text style={styles.formLabel}>Editors</Text>
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
                      editors: updatedEditors,
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
        onPress={createPost}
        testID="btn-create-post"
        title="Create Post"
        color="#000000"
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
  heading: {
    fontSize: 25,
    color: 'white',
  },
  newPostContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
    paddingHorizontal: 20,
    padding: 10,
    fontSize: 20,
  },
  formLabel: {
    color: '#000000',
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#fff',
  },
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default NewPostScreen;
