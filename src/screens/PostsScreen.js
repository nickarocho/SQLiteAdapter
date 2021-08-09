import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  SafeAreaView,
} from 'react-native';
import PostComponent from '../components/Post';

import {DataStore} from 'aws-amplify';
import {Post, Comment, PostEditor} from '../models';

const PostsScreen = ({navigation}) => {
  const [posts, updatePosts] = useState([]);

  useEffect(() => {
    fetchPosts();
    const postSubscription = DataStore.observe(Post).subscribe(async () => {
      try {
        fetchPosts();
      } catch (err) {
        console.error('Error fetching posts: ', err);
      }
    });
    const commentSubscription = DataStore.observe(Comment).subscribe(
      async () => {
        try {
          fetchPosts();
        } catch (err) {
          console.error('Error fetching posts: ', err);
        }
      },
    );

    return () => {
      postSubscription.unsubscribe();
      commentSubscription.unsubscribe();
    };
  }, []);

  const fetchPosts = async () => {
    try {
      const allPosts = await DataStore.query(Post);

      // merge Post model with Comment model
      Promise.all(
        allPosts.map(async post => {
          let id = post.id;
          const comments = (await DataStore.query(Comment)).filter(
            c => c.post.id === id,
          );
          const editors = (await DataStore.query(PostEditor)).filter(
            c => c.post.id === id,
          );
          return {...post, comments, editors};
        }),
      ).then(syncedPosts => {
        // update state w/ the newest post first
        updatePosts(syncedPosts.reverse());
      });
    } catch (err) {
      console.error('something went wrong with fetchPosts:', err);
    }
  };

  return (
    <ScrollView>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>
          All Posts (<Text testID="post-count">{posts.length}</Text>)
        </Text>
        <Button
          style={styles.addPostBtn}
          onPress={() => navigation.navigate('NewPost')}
          testID="btn-navigate-new-post"
          title="✚ New Post"
          color="#2b2b2b"
        />
      </View>
      <SafeAreaView>
        <ScrollView>
          {posts.map((item, index) => {
            return (
              <PostComponent
                key={index}
                post={{...item}}
                style={styles.textStyle}
                navigation={navigation}
                fetchPosts={fetchPosts}
              />
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headingContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  textStyle: {
    marginVertical: 50,
    fontSize: 25,
  },
  heading: {
    fontSize: 25,
    color: 'black',
  },
  addPostBtn: {
    borderRadius: 500,
    color: 'white',
  },
  addPostBtnText: {
    color: 'white',
    fontSize: 40,
  },
});

export default PostsScreen;
