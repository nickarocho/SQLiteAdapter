import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  SafeAreaView,
} from 'react-native';
import Post from '../components/Post';

const PostsScreen = ({navigation}) => {
  const posts = [
    {
      id: '37c7b9d4-d854-42c8-91a8-09be8f2bfeea',
      title: 'Post 1',
      views: 0,
      metadata: '',
      draft: false,
      rating: 5,
      editors: ['1', '2', '5'],
      comments: [
        {
          content: 'post 1 comment 1',
          id: 'e609bba8-9cdd-43cc-9be4-7852dabfa327',
        },
        {
          content: 'post 1 comment 2',
          id: 'e609bba8-9cdd-43cc-9be4-7852dabfa327',
        },
        {
          content: 'post 1 comment 3',
          id: 'e609bba8-9cdd-43cc-9be4-7852dabfa327',
        },
        {
          content: 'post 1 comment 4',
          id: 'e609bba8-9cdd-43cc-9be4-7852dabfa327',
        },
        {
          content: 'post 1 comment 5',
          id: 'e609bba8-9cdd-43cc-9be4-7852dabfa327',
        },
        {
          content: 'post 1 comment 6',
          id: 'e609bba8-9cdd-43cc-9be4-7852dabfa327',
        },
      ],
    },
    {
      id: '8d074d30-aae6-4263-9564-dcac5ea7d933',
      title: 'Post 2',
      views: 0,
      metadata: '',
      draft: false,
      rating: 5,
      editors: ['4'],
      comments: [
        {
          content: 'post 2 comment 1',
          id: '50983c1d-dcf8-4e1f-80df-9694dad1c381',
        },
        {
          content: 'post 2 comment 2',
          id: '50983c1d-dcf8-4e1f-80df-9694dad1c381',
        },
        {
          content: 'post 2 comment 3',
          id: '50983c1d-dcf8-4e1f-80df-9694dad1c381',
        },
      ],
    },
    {
      id: 'aa1a573c-f6a6-4171-af55-16b1be706e20',
      title: 'Post 3',
      views: 0,
      metadata: '',
      draft: false,
      rating: 5,
      editors: [],
      comments: [
        {
          content: 'post 3 comment 1',
          id: '9a958c46-25c1-472b-8cc9-baaa52beaa63',
        },
      ],
    },
    {
      id: 'eae89f09-d0bb-4c25-bcd9-09a7989a6b15',
      title: 'Post 4',
      views: 0,
      metadata: '',
      draft: false,
      rating: 5,
      editors: ['1'],
      comments: [],
    },
    {
      id: 'af55944b-56ed-43fe-a1e0-6bc74fb21014',
      title: 'Post 5',
      views: 0,
      metadata: '',
      draft: false,
      rating: 5,
      editors: ['2', '5'],
      comments: [
        {
          content: 'post 5 comment 1',
          id: 'cb3fe04e-5a35-450f-80cb-ff0fd84adbea',
        },
        {
          content: 'post 5 comment 2',
          id: 'cb3fe04e-5a35-450f-80cb-ff0fd84adbea',
        },
      ],
    },
    {
      id: '999d6b46-5ab6-4ffe-9db9-94f961db8658',
      title: 'Post 6',
      views: 0,
      metadata: '',
      draft: false,
      rating: 5,
      editors: ['2'],
      comments: [
        {
          content: 'post 6 comment 1',
          id: '49e2dc16-7822-4895-b161-bd074695c74e',
        },
      ],
    },
    {
      id: '122ad5fa-adb9-4c24-99dc-c87568c3229f',
      title: 'Post 7',
      views: 0,
      metadata: '',
      draft: false,
      rating: 5,
      editors: ['1', '2', '3'],
      comments: [
        {
          content: 'post 7 comment 1',
          id: '8ea8c2ce-ddd3-4234-bbca-44af97c67e8b',
        },
        {
          content: 'post 7 comment 2',
          id: '8ea8c2ce-ddd3-4234-bbca-44af97c67e8b',
        },
        {
          content: 'post 7 comment 3',
          id: '8ea8c2ce-ddd3-4234-bbca-44af97c67e8b',
        },
        {
          content: 'post 7 comment 4',
          id: '8ea8c2ce-ddd3-4234-bbca-44af97c67e8b',
        },
        {
          content: 'post 7 comment 5',
          id: '8ea8c2ce-ddd3-4234-bbca-44af97c67e8b',
        },
        {
          content: 'post 7 comment 6',
          id: '8ea8c2ce-ddd3-4234-bbca-44af97c67e8b',
        },
        {
          content: 'post 7 comment 7',
          id: '8ea8c2ce-ddd3-4234-bbca-44af97c67e8b',
        },
        {
          content: 'post 7 comment 8',
          id: '8ea8c2ce-ddd3-4234-bbca-44af97c67e8b',
        },
      ],
    },
  ];
  return (
    <SafeAreaView>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Posts ({posts.length})</Text>
        <Button
          style={styles.addPostBtn}
          onPress={() => navigation.navigate('NewPost')}
          title="✚ New Post"
          color="black"
        />
      </View>
      <FlatList
        keyExtractor={post => post.id}
        data={posts}
        renderItem={({item}) => {
          return (
            <Post
              post={{...item}}
              style={styles.textStyle}
              navigation={navigation}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headingContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#2b2b2b',
  },
  textStyle: {
    marginVertical: 50,
    fontSize: 25,
  },
  heading: {
    fontSize: 25,
    color: 'white',
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
