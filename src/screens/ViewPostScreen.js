import React, {useState, useEffect, useCallback, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  Switch,
  Alert,
  SafeAreaView,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import CommentComponent from '../components/Comment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Post, Comment, PostEditor, User} from '../models';
import {DataStore} from 'aws-amplify';
import NotificationContext from '../context/NotificationContext';

const ViewPostScreen = props => {
  const {post} = props.route.params;
  const {navigation} = props;
  const [notification, setNotification] = useContext(NotificationContext);
  const [editedPost, setEditedPost] = useState({...post});
  const [newComment, setNewComment] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editors, setEditors] = useState([]);
  const [editorModels, setEditorModels] = useState([]);
  const [cachedPostEditorUsernames, setCachedPostEditorUsernames] = useState(
    [],
  );

  const toggleEditPostSwitch = () => {
    if (isEditing) {
      Alert.alert(
        'Save your changes?',
        `Do you want to save all the changes you've made to this post?`,
        [
          {
            text: 'Save',
            onPress: () => {
              handleUpdatePost(editedPost.id);
              setIsEditing(previousState => !previousState);
            },
            style: 'destructive',
          },
          {
            text: 'Cancel',
            onPress: () => {
              setIsEditing(previousState => !previousState);
              setEditedPost({
                ...post,
              });
            },
            style: 'cancel',
          },
        ],
      );
    } else {
      setIsEditing(previousState => !previousState);
    }
  };

  const handleUpdatePost = async id => {
    if (!id) {
      console.error('No Post ID passed to handleUpdate');
    }

    try {
      const originalPost = await DataStore.query(Post, id);
      await updatePostEditors();

      await DataStore.save(
        Post.copyOf(originalPost, updated => {
          updated.title = editedPost.title;
          updated.draft = editedPost.draft;
          updated.views = editedPost.views;
          updated.rating = editedPost.rating;
          updated.metadata = editedPost.metadata;
          updated.comments = editedPost.comments;
        }),
      )
        .then(updated => {
          setEditedPost({
            ...updated,
          });

          setNotification({
            ...notification,
            message: 'Successfully updated post!',
            type: 'success',
            active: true,
          });
        })
        .catch(err => {
          console.error('DataStore.save(Post.copyOf(...)) error: ', err);
          setNotification({
            ...notification,
            message: 'DataStore.save(Post.copyOf(...)) error: ' + err.message,
            type: 'error',
            active: true,
          });
        });
    } catch (err) {
      console.error('something went wrong with handleUpdatePost', err);
    }
  };

  const handleEdit = val => {
    setEditedPost(val);
  };

  const handleSubmitComment = async () => {
    try {
      await DataStore.save(
        new Comment({
          content: newComment,
          postID: post.id,
        }),
      );

      setNotification({
        ...notification,
        message: 'Successfully created new comment!',
        type: 'success',
        active: true,
      });
    } catch (err) {
      console.error('something went wrong with handleSubmitComment:', err);
      setNotification({
        ...notification,
        message: 'Error adding comment: ' + err.message,
        type: 'error',
        active: true,
      });
    }
  };

  const fetchComments = useCallback(async () => {
    try {
      const allComments = (await DataStore.query(Comment)).filter(
        c => c.post.id === post.id,
      );
      setEditedPost({...post, comments: allComments});

      // clear the input field
      setNewComment('');
    } catch (err) {
      console.error('something went wrong with fetchComments:', err);
    }
  }, [post]);

  const createEditorsMap = async postEditorModels => {
    const editorIds = postEditorModels.map(e => {
      if (!e.editor) return null;
      return e.editor.id;
    });

    const allUsers = await DataStore.query(User);
    return allUsers.map(user => {
      return {
        ...user,
        assigned: editorIds.includes(user.id),
      };
    });
  };

  const createPostEditor = async newEditor => {
    try {
      const newEditorModel = await DataStore.save(
        new PostEditor({
          postID: post.id,
          editor: newEditor,
        }),
      );
      return newEditorModel;
    } catch (err) {
      console.error('something went wrong in createPostEditor: ', err);
      setNotification({
        ...notification,
        message: 'Error updating post: ' + err.message,
        type: 'error',
        active: true,
      });
    }
  };

  const updatePostEditors = () => {
    // 1. cache all the PostEditors on first load via user ID/username
    // 2. toggle via checkbox - done via checkbox callback fn
    // 3. when ready to save, compare currently checked with 'cached checked'
    const selectedEditors = editors.filter(e => e.assigned);
    selectedEditors.forEach(async editor => {
      // 4. if currently checked was already in 'cached checked', do nothing
      // 5. if currently check was not already in 'cached checked', create a new PostEditor
      if (cachedPostEditorUsernames.indexOf(editor.username) < 0) {
        try {
          await createPostEditor(editor);
        } catch (err) {
          console.error('something went wrong in updatePostEditors', err);
          setNotification({
            ...notification,
            message: 'Error with updatePostEditors: ' + err.message,
            type: 'error',
            active: true,
          });
        }
      }
    });

    // 6. if NOT currently checked WAS in 'cached' checked, delete the PostEditor
    const deSelectedEditors = editors.filter(e => !e.assigned);
    deSelectedEditors.forEach(async editor => {
      if (cachedPostEditorUsernames.indexOf(editor.username) > -1) {
        try {
          if (!editor.id)
            throw new Error('No editorId found on mapped PostEditor model');
          const thisPostEditor = editorModels.find(em => {
            return em.editor.id === editor.id;
          });
          DataStore.delete(thisPostEditor);
        } catch (err) {
          console.error('something went wrong deleting a postEditor', err);
          setNotification({
            ...notification,
            message: 'Error with updatePostEditors: ' + err.message,
            type: 'error',
            active: true,
          });
        }
      }
    });

    fetchEditors();
  };

  const fetchEditors = useCallback(async () => {
    try {
      const thisPostEditorsModels = (await DataStore.query(PostEditor)).filter(
        pe => {
          if (!pe.post) return null;
          return pe.post.id === post.id;
        },
      );

      const postEditorUsernameArray = thisPostEditorsModels.map(
        e => e.editor.username,
      );

      setEditorModels([...thisPostEditorsModels]);
      setCachedPostEditorUsernames(postEditorUsernameArray);

      const editorsMap = await createEditorsMap(thisPostEditorsModels);
      setEditors(editorsMap);
    } catch (err) {
      console.error('something went wrong with fetchEditors:', err);
    }
  }, [post]);

  useEffect(() => {
    fetchEditors();
    fetchComments();
    const commentSubscription = DataStore.observe(Comment).subscribe(
      async () => {
        try {
          fetchComments();
        } catch (err) {
          console.error('Error fetching comments: ', err);
        }
      },
    );
    const postEditorsSubscription = DataStore.observe(PostEditor).subscribe(
      async () => {
        try {
          fetchEditors();
        } catch (err) {
          console.error('Error fetching postEditors: ', err);
        }
      },
    );
    return () => {
      commentSubscription.unsubscribe();
      postEditorsSubscription.unsubscribe();
    };
  }, [fetchComments, fetchEditors]);

  return (
    <ScrollView style={styles.container} nestedScrollEnabled={true}>
      <Pressable
        style={styles.backContainer}
        testID="navigate-back-all-posts"
        onPress={() => navigation.navigate('PostsScreen')}>
        <MaterialCommunityIcons name="arrow-left" size={20} />
        <Text style={styles.back}>All posts</Text>
      </Pressable>

      <View style={styles.editContainer}>
        <Text style={styles.editProfileLabel}>Edit Post</Text>
        <Switch
          testID="switch-toggle-edit-post"
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEditing ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleEditPostSwitch}
          value={isEditing}
        />
      </View>

      {isEditing ? (
        <View style={styles.newPostContainer}>
          <Text style={styles.listLabel}>Post title</Text>
          <TextInput
            style={styles.editInput}
            onChangeText={val => handleEdit({...editedPost, title: val})}
            value={editedPost.title}
            placeholder="Post title"
            showSoftInputOnFocus={false}
            testID={`edit-post-title`}
          />

          <Text style={styles.listLabel}>Views</Text>
          <TextInput
            style={styles.editInput}
            onChangeText={val => {
              const parsedVal = parseInt(val) || undefined;
              handleEdit({...editedPost, views: parsedVal});
            }}
            value={JSON.stringify(editedPost.views)}
            showSoftInputOnFocus={false}
            testID={`edit-post-views`}
          />

          <Text style={styles.listLabel}>Draft?</Text>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={editedPost.draft ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={val => handleEdit({...editedPost, draft: val})}
            value={editedPost.draft}
            testID={`edit-post-draft`}
          />

          <Text style={styles.listLabel}>Rating</Text>
          <TextInput
            style={styles.editInput}
            onChangeText={val => {
              const parsedVal = parseInt(val) || undefined;
              handleEdit({...editedPost, rating: parsedVal});
            }}
            value={JSON.stringify(editedPost.rating)}
            showSoftInputOnFocus={false}
            testID={`edit-post-ratings`}
          />

          <Text style={styles.listLabel}>Editors</Text>
          <SafeAreaView>
            {editors.length > 0 ? (
              <ScrollView>
                {editors.map((item, index) => {
                  return (
                    <View style={styles.checkboxContainer} key={index}>
                      <CheckBox
                        disabled={false}
                        style={styles.textStyle}
                        value={item.assigned}
                        testID={`edit-post-editor-${index}`}
                        onValueChange={async newValue => {
                          let updatedEditors = editors.map(editor =>
                            editor.id === item.id
                              ? {
                                  ...editor,
                                  assigned: newValue,
                                }
                              : editor,
                          );

                          setEditors(updatedEditors);
                        }}
                      />
                      <Text style={styles.checkboxText}>{item.username}</Text>
                    </View>
                  );
                })}
              </ScrollView>
            ) : (
              <Text>
                <Pressable onPress={() => navigation.navigate('NewUser')}>
                  <Text>No users...</Text>
                  <Text style={styles.underlined}>
                    Create a user to add one as an Editor →
                  </Text>
                </Pressable>{' '}
              </Text>
            )}
          </SafeAreaView>
        </View>
      ) : (
        // Default view - not editing
        <View style={styles.newPostContainer}>
          <Text style={styles.listLabel}>Post title</Text>
          <Text style={styles.bigText} testID="saved-post-title">
            {editedPost.title}
          </Text>

          <Text style={styles.listLabel}>Views</Text>
          <Text style={styles.bigText}>{editedPost.views}</Text>

          <Text style={styles.listLabel}>Draft or Published?</Text>
          <Text style={styles.bigText}>
            {editedPost.draft ? 'Draft' : 'Published'}
          </Text>

          <Text style={styles.listLabel}>Rating</Text>
          <Text style={styles.bigText}>{editedPost.rating}</Text>

          <Text style={styles.listLabel}>Editors</Text>
          <SafeAreaView>
            <ScrollView>
              {editors.map((item, index) => {
                return (
                  <View key={index} style={styles.checkboxContainer}>
                    {item.assigned && (
                      <Text style={styles.bigText}>- {item.username}</Text>
                    )}
                  </View>
                );
              })}
            </ScrollView>
          </SafeAreaView>
        </View>
      )}

      <View style={styles.commentContainer}>
        <Text style={styles.commentLabel}>
          Comments (
          <Text testID="comment-count">{editedPost.comments?.length}</Text>)
        </Text>
        <SafeAreaView>
          <ScrollView>
            {editedPost.comments.map((item, index) => {
              return (
                <CommentComponent
                  key={index}
                  comment={{...item, commentIndex: index}}
                  navigation={navigation}
                  style={styles.comment}
                  fetchComments={fetchComments}
                />
              );
            })}
          </ScrollView>
        </SafeAreaView>
      </View>

      {/* new comment input */}
      <View style={styles.editCommentContainer}>
        <TextInput
          value={newComment}
          onChangeText={setNewComment}
          style={styles.commentInput}
          onSubmitEditing={handleSubmitComment}
          placeholder={'Add a comment...'}
          testID="add-comment-input"
          showSoftInputOnFocus={false}
        />
        <Pressable
          style={styles.icon}
          testID="icon-submit-comment"
          onPress={handleSubmitComment}>
          <MaterialCommunityIcons name="check" color={'#1b494a'} size={30} />
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    display: 'flex',
    paddingHorizontal: 20,
  },
  bigText: {
    fontSize: 20,
    color: 'black',
  },
  underlined: {
    textDecorationLine: 'underline',
  },
  listLabel: {
    marginTop: 25,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  editContainer: {display: 'flex', alignItems: 'flex-end'},
  editProfileLabel: {
    textAlign: 'right',
    marginBottom: 10,
  },
  editInput: {
    fontSize: 20,
    color: 'black',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 20,
  },
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxText: {
    paddingLeft: 10,
  },
  commentLabel: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
    marginVertical: 10,
  },
  commentContainer: {
    borderColor: 'rgba(0,0,0,.3)',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  editCommentContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  comment: {
    borderColor: 'rgba(0,0,0,.3)',
    borderTopWidth: 1,
    paddingVertical: 15,
    flexGrow: 1,
  },
  commentInput: {
    marginTop: 20,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 50,
    flexGrow: 1,
    padding: 10,
  },
  backContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  back: {
    color: '#000',
    textDecorationLine: 'underline',
    fontSize: 18,
    marginLeft: 5,
  },
});

export default ViewPostScreen;
