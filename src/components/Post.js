import React from 'react';
import {View, Text, StyleSheet, Pressable, Button} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {DataStore} from 'aws-amplify';
import {Post} from '../models';

const PostComponent = ({post, navigation, fetchPosts}) => {
  async function handleDelete() {
    try {
      const thisPost = await DataStore.query(Post, post.id);
      DataStore.delete(thisPost);
      console.log(`Successfully deleted post:`, thisPost);
      fetchPosts();
    } catch (err) {
      console.error('something went wrong with handleDelete:', err);
    }
  }
  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        navigation.navigate('Post', {
          post: post,
        });
      }}>
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
            title={'View post'}
            color="#000"
            onPress={() => {
              navigation.navigate('Post', {
                post: post,
              });
            }}
          />
          <Button
            title={'Delete post'}
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
    textAlign: 'right',
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

export default PostComponent;
