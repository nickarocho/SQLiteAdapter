import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
  FlatList,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import users from '../utils/users';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Post = ({post, navigation}) => {
  const [editPost, setEditPost] = useState({...post});
  const [isEditing, setIsEditing] = useState(false);

  const editorsMap = users.map(u => {
    return {
      id: u.id,
      username: u.username,
      assigned: editPost.editors.includes(u.id),
    };
  });
  const [editors, setEditors] = useState([...editorsMap]);

  const handleEdit = val => {
    setEditPost(val);
  };

  const toggleEdit = () => {
    setIsEditing(previousState => !previousState);
  };

  const handleSave = () => {
    // TODO: save data mutation
    toggleEdit();
  };

  const handleCancel = () => {
    toggleEdit();
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Post',
      `Are you sure you want to delete this post? There's no going back...`,
      [
        {
          text: 'Yes, delete forever',
          onPress: () => {
            // TODO: delete the post
            console.log('Deleting post...');
          },
          style: 'destructive',
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
    );
  };

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        navigation.navigate('Post', {
          post: post,
        });
      }}>
      {isEditing ? (
        <View>
          <Text style={styles.formLabel}>Post Title</Text>
          <TextInput
            style={styles.editPostInput}
            onChangeText={val => handleEdit({...editPost, title: val})}>
            {editPost.title}
          </TextInput>
          <Text style={styles.formLabel}>Post Editors</Text>
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
                    }}
                  />
                  <Text>{item.username}</Text>
                </View>
              );
            }}
          />
          <View style={styles.editOptionsContainer}>
            <Pressable style={styles.icon} onPress={handleCancel}>
              <MaterialCommunityIcons
                name="cancel"
                color={'#6e1701'}
                size={30}
              />
              <Text style={styles.cancelLabel}>Cancel</Text>
            </Pressable>
            <Pressable style={styles.icon} onPress={handleSave}>
              <MaterialCommunityIcons
                name="cloud-check"
                color={'#1b494a'}
                size={30}
              />
              <Text style={styles.saveLabel}>Save</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <View>
          <Text style={styles.bigText}>{post.title}</Text>
          <View style={styles.commentContainer}>
            <Pressable
              onPress={() => {
                navigation.navigate('Post', {
                  post: post,
                });
              }}>
              <Text style={styles.smallText}>
                Comments ({post.comments.length})
              </Text>
            </Pressable>
          </View>
          {/* TODO: wrap with conditional for isAuthor's post */}
          <View style={styles.btnContainer}>
            <Pressable style={styles.icon} onPress={handleDelete}>
              <MaterialCommunityIcons
                name="delete"
                color={'#6e1701'}
                size={30}
              />
            </Pressable>
            <Pressable style={styles.icon} onPress={toggleEdit}>
              <MaterialCommunityIcons
                name="pencil"
                color={'#1b494a'}
                size={30}
              />
            </Pressable>
          </View>
        </View>
      )}
    </Pressable>
  );
};
const styles = StyleSheet.create({
  container: {
    minHeight: 100,
    marginVertical: 10,
    borderColor: 'rgba(0,0,0,.2)',
    borderWidth: 5,
    borderRadius: 10,
    marginHorizontal: 10,
    display: 'flex',
    justifyContent: 'center',
    padding: 20,
  },
  smallText: {
    marginTop: 5,
    fontSize: 15,
    color: 'black',
  },
  bigText: {
    fontSize: 20,
    color: 'black',
  },
  editPostInput: {
    fontSize: 20,
    color: 'black',
    backgroundColor: 'white',
    borderColor: 'black',
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  icon: {
    marginRight: 10,
    display: 'flex',
    alignItems: 'center',
  },
  editOptionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  formLabel: {
    color: '#000000',
    marginTop: 10,
    marginBottom: 5,
  },
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveLabel: {
    fontSize: 15,
    color: '#1b494a',
  },
  cancelLabel: {
    fontSize: 15,
    color: '#6e1701',
  },
});

export default Post;
