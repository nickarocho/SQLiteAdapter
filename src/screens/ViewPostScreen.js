import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TextInput,
  Pressable,
  Switch,
  Alert,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import CommentComponent from '../components/Comment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Post, Comment} from '../models';
import {DataStore} from 'aws-amplify';
// TODO: get users via DS query
import users from '../utils/users';

const ViewPostScreen = ({navigation}) => {
  const {post} = navigation.state.params;
  const [editedPost, setEditedPost] = useState({...post});
  const [newComment, setNewComment] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditPostSwitch = () => {
    if (isEditing) {
      Alert.alert(
        'Save your changes?',
        `Do you want to save all the changes you've made to this post?`,
        [
          {
            text: 'Save',
            onPress: () => {
              // TODO: save the post via DS
              console.log('Saving post');
              handleUpdatePost(editedPost.id);
              setIsEditing(previousState => !previousState);
            },
            style: 'destructive',
          },
          {
            text: 'Cancel',
            onPress: () => {
              setIsEditing(previousState => !previousState);
              console.log('Cancel Pressed');
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

  const editorsMap = users.map(u => {
    return {
      id: u.id,
      username: u.username,
      assigned: editedPost.editors.includes(u.id),
    };
  });
  const [editors, setEditors] = useState([...editorsMap]);

  async function handleUpdatePost(id) {
    if (!id) {
      console.error('No Post ID passed to handleUpdate');
    }
    try {
      const original = await DataStore.query(Post, id);
      await DataStore.save(
        Post.copyOf(original, updated => {
          Object.assign(updated, editedPost);
        }),
      ).then(updated => {
        setEditedPost({
          ...updated,
        });
      });
    } catch (err) {
      console.error('something went wrong with handleUpdatePost', err);
    }
  }

  const handleEdit = val => {
    setEditedPost(val);
  };

  async function handleSubmitComment() {
    try {
      // just clears the form
      const thisComment = await DataStore.save(
        new Comment({
          content: newComment,
          postID: post.id,
        }),
      );
      console.log({thisComment});
    } catch (err) {
      console.error('something went wrong with handleSubmitComment:', err);
    }
  }

  const fetchComments = async () => {
    console.log('fetching comments');
    try {
      const allComments = (await DataStore.query(Comment)).filter(
        c => c.post.id === post.id,
      );
      setEditedPost({...post, comments: allComments});
      setNewComment('');
    } catch (err) {
      console.error('something went wrong with fetchComments:', err);
    }
  };

  useEffect(() => {
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
    return () => {
      commentSubscription.unsubscribe();
    };
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Pressable
        style={styles.backContainer}
        onPress={() => navigation.navigate('Posts')}>
        <MaterialCommunityIcons name="arrow-left" size={20} />

        <Text style={styles.back}>All posts</Text>
      </Pressable>
      <Text style={styles.editProfileLabel}>Edit Profile</Text>
      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEditing ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleEditPostSwitch}
        value={isEditing}
      />
      {isEditing ? (
        <View style={styles.newPostContainer}>
          <Text style={styles.listLabel}>Post title</Text>
          <TextInput
            style={styles.editInput}
            onChangeText={val => handleEdit({...editedPost, title: val})}
            value={editedPost.title}
            placeholder="Post title"
            multiline
            numberOfLines={2}
          />

          <Text style={styles.listLabel}>Views</Text>
          <TextInput
            style={styles.editInput}
            onChangeText={val => {
              const parsedVal = parseInt(val) || undefined;
              handleEdit({...editedPost, views: parsedVal});
            }}
            value={JSON.stringify(editedPost.views)}
            keyboardType={'number-pad'}
          />

          <Text style={styles.listLabel}>Draft?</Text>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={editedPost.draft ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={val => handleEdit({...editedPost, draft: val})}
            value={editedPost.draft}
          />

          <Text style={styles.listLabel}>Rating</Text>
          <TextInput
            style={styles.editInput}
            onChangeText={val => {
              const parsedVal = parseInt(val) || undefined;
              handleEdit({...editedPost, rating: parsedVal});
            }}
            value={JSON.stringify(editedPost.rating)}
            keyboardType={'number-pad'}
          />

          <Text style={styles.listLabel}>Editors</Text>
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
                        ...editedPost,
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
      ) : (
        <View style={styles.newPostContainer}>
          <Text style={styles.listLabel}>Post title</Text>
          <Text style={styles.bigText}>{editedPost.title}</Text>

          <Text style={styles.listLabel}>Views</Text>
          <Text style={styles.bigText}>{editedPost.views}</Text>

          <Text style={styles.listLabel}>Draft or Published?</Text>
          <Text style={styles.bigText}>
            {editedPost.draft ? 'Draft' : 'Published'}
          </Text>

          <Text style={styles.listLabel}>Rating</Text>
          <Text style={styles.bigText}>{editedPost.rating}</Text>

          <Text style={styles.listLabel}>Editors</Text>
          <FlatList
            keyExtractor={user => user.id}
            data={editors}
            renderItem={({item}) => {
              return (
                <View style={styles.checkboxContainer}>
                  {item.assigned && (
                    <Text style={styles.bigText}>- {item.username}</Text>
                  )}
                </View>
              );
            }}
          />
        </View>
      )}
      <View style={styles.commentContainer}>
        <Text style={styles.commentLabel}>
          Comments ({editedPost.comments.length})
        </Text>
        <FlatList
          keyExtractor={comment => comment.id}
          data={editedPost.comments}
          renderItem={({item}) => {
            return (
              <CommentComponent
                comment={item}
                navigation={navigation}
                style={styles.comment}
                fetchComments={fetchComments}
              />
            );
          }}
        />
      </View>
      <View style={styles.editCommentContainer}>
        <TextInput
          value={newComment}
          onChangeText={setNewComment}
          style={styles.commentInput}
          onSubmitEditing={handleSubmitComment}
          placeholder={'Add a comment...'}
        />
        <Pressable style={styles.icon} onPress={handleSubmitComment}>
          <MaterialCommunityIcons name="check" color={'#1b494a'} size={30} />
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 100,
    marginVertical: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    display: 'flex',
    padding: 20,
  },
  bigText: {
    fontSize: 20,
    color: 'black',
  },
  listLabel: {
    marginTop: 25,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  editProfileLabel: {
    textAlign: 'right',
  },
  editInput: {
    fontSize: 20,
    color: 'black',
    backgroundColor: '#fff',
  },
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
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
