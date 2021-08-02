import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
  Button,
} from 'react-native';

const PostsScreen = ({post, navigation}) => {
  const [postValue, setPostValue] = useState(post.title);
  const [isEditing, setIsEditing] = useState(false);
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
          <TextInput style={styles.editPostInput} onChangeText={setPostValue}>
            {postValue}
          </TextInput>
          <View style={styles.editOptionsContainer}>
            <Pressable onPress={handleCancel}>
              <Text style={styles.cancelLabel}>X Cancel</Text>
            </Pressable>
            <Pressable onPress={handleSave}>
              <Text style={styles.saveLabel}>✔ Save</Text>
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
            <Button
              onPress={handleDelete}
              title="Delete Post"
              color="#991d14"
              style={styles.deleteBtn}
            />
            <Button
              onPress={toggleEdit}
              title="Edit Post"
              style={styles.editBtn}
            />
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
  deleteBtn: {
    width: 50,
  },
  editBtn: {
    width: 50,
  },
  editOptionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  saveLabel: {
    fontSize: 15,
    color: 'green',
  },
  cancelLabel: {
    fontSize: 15,
    color: 'red',
  },
});

export default PostsScreen;
