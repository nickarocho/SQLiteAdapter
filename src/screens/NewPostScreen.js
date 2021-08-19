import React, {useState, useCallback, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Button,
  Switch,
  SafeAreaView,
  Pressable,
} from 'react-native';
import NotificationContext from '../context/NotificationContext';
import CheckBox from '@react-native-community/checkbox';
import {DataStore} from '@aws-amplify/datastore';
import {Post, User, PostEditor} from '../models';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const NewPostScreen = ({navigation}) => {
  const [newPost, setNewPost] = useState({
    title: '',
    views: undefined,
    metadata: '{}',
    draft: true,
    rating: undefined,
    editors: [],
    comments: [],
  });
  const [editors, setEditors] = useState([]);
  const [notification, setNotification] = useContext(NotificationContext);

  const fetchUsers = useCallback(async () => {
    try {
      const allUsers = await DataStore.query(User);
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

  const createPostEditors = async post => {
    try {
      const result = await Promise.all(
        editors
          .filter(item => item.assigned)
          .map(async item => {
            const user = await DataStore.query(User, item.id);
            const postEditor = await DataStore.save(
              new PostEditor({
                postID: post.id,
                editor: user,
              }),
            );
            return postEditor;
          }),
      );
      return result;
    } catch (err) {
      console.error(err);
      setNotification({
        ...notification,
        message: 'Error creating Post Editor' + err,
        type: 'error',
        active: true,
      });
    }
  };

  const createPost = async () => {
    if (!newPost.title) {
      setNotification({
        ...notification,
        message: 'No title, no post! Add a title.',
        type: 'error',
        active: true,
      });
      return;
    }
    try {
      const post = await DataStore.save(
        new Post({
          title: newPost.title,
          draft: newPost.draft,
          metadata: newPost.metadata,
          rating: newPost.rating,
          views: newPost.views,
        }),
      );
      const postEditors = await createPostEditors(post);
      setNotification({
        ...notification,
        message: 'Successfully created new post!',
        type: 'success',
        active: true,
      });
      navigation.navigate('PostsScreen');
    } catch (err) {
      console.error('something went wrong with createPost:', err);
      setNotification({
        ...notification,
        message: 'Error creating Post' + err,
        type: 'error',
        active: true,
      });
    }
  };

  return (
    <ScrollView testID="new-post-body">
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>🖋 Create a New Post</Text>
      </View>
      <Pressable
        style={styles.backContainer}
        testID="navigate-back-all-users"
        onPress={() => navigation.navigate('PostsScreen')}>
        <MaterialCommunityIcons name="arrow-left" size={20} />
        <Text style={styles.back}>All posts</Text>
      </Pressable>

      <View style={styles.newPostContainer}>
        <Text style={styles.formLabel}>Post title</Text>
        <TextInput
          style={styles.input}
          onChangeText={val => handleEdit({...newPost, title: val})}
          value={newPost.title}
          placeholder="Post title"
          testID="new-post-title-input"
          showSoftInputOnFocus={false}
        />

        <Text style={styles.formLabel}>Views</Text>
        <TextInput
          style={styles.input}
          onChangeText={val => {
            const parsedVal = parseInt(val) || undefined;
            handleEdit({...newPost, views: parsedVal});
          }}
          value={JSON.stringify(newPost.views)}
          keyboardType={'number-pad'}
          placeholder="Enter a number"
          testID="new-post-views-input"
          showSoftInputOnFocus={false}
        />

        <Text style={styles.formLabel}>Draft?</Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={newPost.draft ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={val => handleEdit({...newPost, draft: val})}
          value={newPost.draft}
          testID="new-post-draft-toggle"
        />

        <Text style={styles.formLabel}>Rating</Text>
        <TextInput
          style={styles.input}
          onChangeText={val => {
            const parsedVal = parseInt(val) || undefined;
            handleEdit({...newPost, rating: parsedVal});
          }}
          value={JSON.stringify(newPost.rating)}
          keyboardType={'number-pad'}
          placeholder="0 - 10"
          testID="new-post-rating-input"
          showSoftInputOnFocus={false}
        />

        <Text style={styles.formLabel}>Editors</Text>
        {editors.length > 0 && (
          <SafeAreaView>
            <ScrollView>
              {editors.map((item, index) => {
                return (
                  <View key={index} style={styles.checkboxContainer}>
                    <CheckBox
                      disabled={false}
                      value={item.assigned}
                      testID={`new-post-editors-checkbox-${index}`}
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
                    <Text style={styles.checkboxText}>{item.username}</Text>
                  </View>
                );
              })}
            </ScrollView>
          </SafeAreaView>
        )}
      </View>

      <Button
        onPress={createPost}
        testID="btn-create-post"
        title="Create Post"
        color="#2b2b2b"
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
  },
  heading: {
    fontSize: 25,
    color: 'black',
  },
  backContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
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
    borderRadius: 20,
    padding: 10,
  },
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxText: {
    paddingLeft: 10,
  },
  back: {
    color: '#000',
    textDecorationLine: 'underline',
    fontSize: 18,
    marginLeft: 5,
  },
});

export default NewPostScreen;
