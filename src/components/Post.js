import React from 'react';
import {View, Text, StyleSheet, Pressable, Button} from 'react-native';

import {DataStore} from 'aws-amplify';
import {Post} from '../models';

const PostComponent = ({post, navigation, fetchPosts}) => {
  async function handleDelete() {
    try {
      const thisPost = await DataStore.query(Post, post.id);
      DataStore.delete(thisPost);
      fetchPosts();
    } catch (err) {
      console.error('something went wrong with handleDelete:', err);
    }
  }

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
        <Text style={styles.bigText}>{post.title}</Text>
        <Text style={styles.smallText}>
          Comments (
          <Text testID={`comment-count-${post.id}`}>
            {post.comments.length}
          </Text>
          )
        </Text>
        <View style={styles.btnContainer}>
          <Button
            title={'View post'}
            color="#000"
            testID={`btn-view-post-${post.id}`}
            onPress={() => {
              navigation.navigate('Post', {
                post: post,
              });
            }}
          />
          <Button
            title={'Delete post'}
            testID={`btn-delete-post-${post.id}`}
            color="#940005"
            onPress={handleDelete}
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
