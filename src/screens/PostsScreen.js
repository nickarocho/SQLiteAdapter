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
      title: 'Post 1',
      id: '37c7b9d4-d854-42c8-91a8-09be8f2bfeea',
      comments: [
        {body: 'post 1 comment 1', id: 'e609bba8-9cdd-43cc-9be4-7852dabfa327'},
        {body: 'post 1 comment 2', id: 'e609bba8-9cdd-43cc-9be4-7852dabfa327'},
        {body: 'post 1 comment 3', id: 'e609bba8-9cdd-43cc-9be4-7852dabfa327'},
        {body: 'post 1 comment 4', id: 'e609bba8-9cdd-43cc-9be4-7852dabfa327'},
        {body: 'post 1 comment 5', id: 'e609bba8-9cdd-43cc-9be4-7852dabfa327'},
        {body: 'post 1 comment 6', id: 'e609bba8-9cdd-43cc-9be4-7852dabfa327'},
      ],
    },
    {
      title: 'Post 2',
      author: 'joe shmoe',
      editor: 'jane shmoe',
      id: '8d074d30-aae6-4263-9564-dcac5ea7d933',
      comments: [
        {body: 'post 2 comment 1', id: '50983c1d-dcf8-4e1f-80df-9694dad1c381'},
        {body: 'post 2 comment 2', id: '50983c1d-dcf8-4e1f-80df-9694dad1c381'},
        {body: 'post 2 comment 3', id: '50983c1d-dcf8-4e1f-80df-9694dad1c381'},
      ],
    },
    {
      title: 'Post 3',
      author: 'joe shmoe',
      editor: 'jane shmoe',
      id: 'aa1a573c-f6a6-4171-af55-16b1be706e20',
      comments: [
        {body: 'post 3 comment 1', id: '9a958c46-25c1-472b-8cc9-baaa52beaa63'},
      ],
    },
    {
      title: 'Post 4',
      author: 'joe shmoe',
      editor: 'jane shmoe',
      id: 'eae89f09-d0bb-4c25-bcd9-09a7989a6b15',
      comments: [],
    },
    {
      title: 'Post 5',
      author: 'joe shmoe',
      editor: 'jane shmoe',
      id: 'af55944b-56ed-43fe-a1e0-6bc74fb21014',
      comments: [
        {body: 'post 5 comment 1', id: 'cb3fe04e-5a35-450f-80cb-ff0fd84adbea'},
        {body: 'post 5 comment 2', id: 'cb3fe04e-5a35-450f-80cb-ff0fd84adbea'},
      ],
    },
    {
      title: 'Post 6',
      author: 'joe shmoe',
      editor: 'jane shmoe',
      id: '999d6b46-5ab6-4ffe-9db9-94f961db8658',
      comments: [
        {body: 'post 6 comment 1', id: '49e2dc16-7822-4895-b161-bd074695c74e'},
      ],
    },
    {
      title: 'Post 7',
      author: 'joe shmoe',
      editor: 'jane shmoe',
      id: '122ad5fa-adb9-4c24-99dc-c87568c3229f',
      comments: [
        {body: 'post 7 comment 1', id: '8ea8c2ce-ddd3-4234-bbca-44af97c67e8b'},
        {body: 'post 7 comment 2', id: '8ea8c2ce-ddd3-4234-bbca-44af97c67e8b'},
        {body: 'post 7 comment 3', id: '8ea8c2ce-ddd3-4234-bbca-44af97c67e8b'},
        {body: 'post 7 comment 4', id: '8ea8c2ce-ddd3-4234-bbca-44af97c67e8b'},
        {body: 'post 7 comment 5', id: '8ea8c2ce-ddd3-4234-bbca-44af97c67e8b'},
        {body: 'post 7 comment 6', id: '8ea8c2ce-ddd3-4234-bbca-44af97c67e8b'},
        {body: 'post 7 comment 7', id: '8ea8c2ce-ddd3-4234-bbca-44af97c67e8b'},
        {body: 'post 7 comment 8', id: '8ea8c2ce-ddd3-4234-bbca-44af97c67e8b'},
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
          title="+"
          color="#000000"
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
    margin: 20,
  },
  textStyle: {
    marginVertical: 50,
    fontSize: 25,
  },
  heading: {
    fontSize: 25,
  },
  addPostBtn: {
    borderRadius: 500,
    padding: 200,
    color: 'white',
  },
  addPostBtnText: {
    color: 'white',
    fontSize: 30,
  },
});

export default PostsScreen;
