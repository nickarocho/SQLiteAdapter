import React, {useContext, useState} from 'react';
import {View, Text, TextInput, StyleSheet, Pressable} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Comment} from '../models';
import {DataStore} from 'aws-amplify';
import NotificationContext from '../context/NotificationContext';

const CommentComponent = ({comment, fetchComments}) => {
  const [editComment, setEditComment] = useState(comment.content);
  const [isEditing, setIsEditing] = useState(false);
  const [notification, setNotification] = useContext(NotificationContext);

  const toggleEdit = () => {
    setIsEditing(previousState => !previousState);
  };

  const handleUpdateComment = async () => {
    try {
      const original = await DataStore.query(Comment, comment.id);
      await DataStore.save(
        Comment.copyOf(original, updated => {
          updated.content = editComment;
        }),
      ).then(() => {
        toggleEdit();
        setNotification({
          ...notification,
          message: 'Successfully updated comment!',
          type: 'success',
          active: true,
        });
      });
    } catch (err) {
      console.error('something went wrong with handleUpdatePost', err);
      setNotification({
        ...notification,
        message: 'Error updating comment: ' + err.message,
        type: 'error',
        active: true,
      });
    }
  };

  const handleDeleteComment = async () => {
    try {
      const thisComment = await DataStore.query(Comment, comment.id);
      DataStore.delete(thisComment);
      setNotification({
        ...notification,
        message: 'Successfully deleted comment!',
        type: 'success',
        active: true,
      });
      fetchComments();
    } catch (err) {
      console.error('something went wrong with handleDelete:', err);
      setNotification({
        ...notification,
        message: 'Error deleting comment: ' + err.message,
        type: 'error',
        active: true,
      });
    }
  };

  return (
    <View>
      {isEditing ? (
        <View style={styles.editCommentContainer}>
          <TextInput
            testID={`edit-comment-${comment.commentIndex}`}
            value={editComment}
            onChangeText={setEditComment}
            style={styles.editCommentInput}
            onSubmitEditing={handleUpdateComment}
          />
          <Pressable
            style={styles.icon}
            testID={`icon-update-comment-${comment.commentIndex}`}
            onPress={handleUpdateComment}>
            <MaterialCommunityIcons
              name="cloud-check"
              color={'#1b494a'}
              size={30}
            />
          </Pressable>
        </View>
      ) : (
        // Default view - not editing
        <View style={styles.editCommentContainer}>
          <Text style={styles.comment}>{comment.content}</Text>
          <Pressable
            style={styles.icon}
            testID={`icon-edit-comment-${comment.commentIndex}`}
            onPress={toggleEdit}>
            <MaterialCommunityIcons name="pencil" color={'#1b494a'} size={20} />
          </Pressable>
          <Pressable
            style={styles.icon}
            testID={`icon-delete-comment-${comment.commentIndex}`}
            onPress={handleDeleteComment}>
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
  icon: {
    marginRight: 10,
    display: 'flex',
    alignItems: 'center',
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
    padding: 10,
    borderRadius: 20,
  },
});

export default CommentComponent;
