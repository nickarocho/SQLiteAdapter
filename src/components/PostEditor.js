import React, {useContext} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

import {DataStore} from 'aws-amplify';
import {PostEditor} from '../models';
import NotificationContext from '../context/NotificationContext';

const PostEditorComponent = ({editorModel, fetchPostEditors}) => {
  const [notification, setNotification] = useContext(NotificationContext);
  const handleDeletePostEditor = async () => {
    try {
      const thisPostEditor = await DataStore.query(PostEditor, editorModel.id);
      DataStore.delete(thisPostEditor);

      setNotification({
        ...notification,
        message: 'Successfully deleted post editor!',
        type: 'success',
        active: true,
      });
      fetchPostEditors();
    } catch (err) {
      console.error('something went wrong with handleDeletePostEditor:', err);

      setNotification({
        ...notification,
        message: 'Error deleting post editor: ' + err.message,
        type: 'error',
        active: true,
      });
    }
  };

  return (
    <View style={styles.container} testID={`postEditor-${editorModel.id}`}>
      <Text>
        <Text style={styles.listLabelBold}>Editor Username: </Text>
        {editorModel.editor ? editorModel.editor.username : 'null'}
      </Text>
      <Text>
        <Text style={styles.listLabelBold}>Editor ID: </Text>
        {editorModel.id}
      </Text>
      <Text>
        <Text style={styles.listLabelBold}>Post Title: </Text>
        {editorModel.post ? editorModel.post.title : 'null'}
      </Text>
      <Text>
        <Text style={styles.listLabelBold}>Post ID: </Text>
        {editorModel.post.id}
      </Text>

      <View style={styles.btnContainer}>
        <Button
          title={'Delete post editor'}
          color="#940005"
          testID={`btn-delete-postEditor-${editorModel.postEditorIndex}`}
          onPress={handleDeletePostEditor}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listLabelBold: {
    fontWeight: 'bold',
  },
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
  bigText: {
    fontSize: 20,
    color: 'black',
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
});

export default PostEditorComponent;
