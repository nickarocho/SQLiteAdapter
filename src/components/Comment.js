import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Comment} from '../models';
import {DataStore} from 'aws-amplify';

const CommentComponent = ({comment, navigation, fetchComments}) => {
  const [editComment, setEditComment] = useState(comment.content);
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing(previousState => !previousState);
  };

  const handleCancel = () => {
    toggleEdit();
  };

  const handleCommentSubmit = () => {
    // TODO: write create comment functionality
    console.log('submit comment!');
  };

  const handleUpdateComment = async () => {
    try {
      const original = await DataStore.query(Comment, comment.id);
      console.log({original});
      await DataStore.save(
        Comment.copyOf(original, updated => {
          updated.content = editComment;
        }),
      ).then(updated => {
        console.log({updated});
        // setEditComment({
        //   ...updated,
        // });
        toggleEdit();
      });
    } catch (err) {
      console.error('something went wrong with handleUpdatePost', err);
    }
  };

  const deleteComment = async () => {
    try {
      const thisComment = await DataStore.query(Comment, comment.id);
      DataStore.delete(thisComment);
      console.log(`Successfully deleted comment:`, thisComment);
      fetchComments();
    } catch (err) {
      console.error('something went wrong with handleDelete:', err);
    }
  };

  return (
    <View>
      {/* TODO: abstract comment to own component to fix toggle issue */}
      {isEditing ? (
        <View style={styles.editCommentContainer}>
          <TextInput
            value={editComment}
            onChangeText={setEditComment}
            style={styles.editCommentInput}
            onSubmitEditing={handleUpdateComment}
          />
          <Pressable style={styles.icon} onPress={handleUpdateComment}>
            <MaterialCommunityIcons
              name="cloud-check"
              color={'#1b494a'}
              size={30}
            />
          </Pressable>
        </View>
      ) : (
        <View style={styles.editCommentContainer}>
          <Text style={styles.comment}>{comment.content}</Text>
          <Pressable style={styles.icon} onPress={toggleEdit}>
            <MaterialCommunityIcons name="pencil" color={'#1b494a'} size={20} />
          </Pressable>
          <Pressable style={styles.icon} onPress={deleteComment}>
            <MaterialCommunityIcons name="delete" color={'#940005'} size={20} />
          </Pressable>
        </View>
      )}
    </View>
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
  editCommentInput: {
    backgroundColor: 'white',
    flexGrow: 1,
    borderColor: 'rgba(0,0,0,.3)',
    borderTopWidth: 1,
  },
});

export default CommentComponent;