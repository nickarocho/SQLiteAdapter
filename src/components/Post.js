import React, {useContext} from 'react';
import {View, Text, StyleSheet, Pressable, Button} from 'react-native';

import {DataStore} from 'aws-amplify';
import {Post} from '../models';
import NotificationContext from '../context/NotificationContext';

const PostComponent = ({post, navigation, fetchPosts}) => {
  const [notification, setNotification] = useContext(NotificationContext);

  const handleDeletePost = async () => {
    try {
      const thisPost = await DataStore.query(Post, post.id);
      DataStore.delete(thisPost);
      fetchPosts();
      setNotification({
        ...notification,
        message: 'Successfully deleted post!',
        type: 'success',
        active: true,
      });
    } catch (err) {
      console.error('something went wrong with handleDeletePost:', err);
      setNotification({
        ...notification,
        message: 'Error deleting post: ' + err.message,
        type: 'error',
        active: true,
      });
    }
  };

  return (
    <Pressable
      style={styles.container}
      testID={`post-${post.id}`}
      onPress={() => {
        navigation.navigate('Post', {
          post: post,
        });
      }}>
      <View>
        <Text style={styles.bigText}>
          <Text>
            <Text style={styles.listLabelBold}>Title: </Text>
            <Text testID={`post-${post.postIndex}-title`}>{post.title}</Text>
          </Text>
        </Text>
        <Text style={styles.smallText}>
          <Text style={styles.listLabelBold}>Comments </Text>(
          <Text testID={`comment-count-${post.id}`}>
            {post.comments.length}
          </Text>
          )
        </Text>
        <Text style={styles.smallText}>
          <Text style={styles.listLabelBold}>Editors </Text>(
          <Text testID={`comment-count-${post.id}`}>
            {post.editors ? post.editors.length : '0'}
          </Text>
          )
        </Text>
        <Text style={styles.smallText}>
          <Text style={styles.listLabelBold}>Views: </Text>
          {post.views}
        </Text>
        <Text style={styles.smallText}>
          <Text style={styles.listLabelBold}>Draft/Published: </Text>
          {post.draft ? 'Draft' : 'Published'}
        </Text>
        <Text style={styles.smallText}>
          <Text style={styles.listLabelBold}>Rating: </Text>
          {post.rating}
        </Text>
        <Text style={styles.smallText}>
          <Text style={styles.listLabelBold}>Post ID: </Text>
          {post.id}
        </Text>
        <View style={styles.btnContainer}>
          <Button
            title={'View post'}
            color="#2b2b2b"
            testID={`btn-view-post-${post.postIndex}`}
            onPress={() => {
              navigation.navigate('Post', {
                post: post,
              });
            }}
          />
          <Button
            title={'Delete post'}
            testID={`btn-delete-post-${post.postIndex}`}
            color="#940005"
            onPress={handleDeletePost}
          />
        </View>
      </View>
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
    marginBottom: 10,
  },
  listLabelBold: {
    fontWeight: 'bold',
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
    textAlign: 'right',
  },
});

export default PostComponent;
