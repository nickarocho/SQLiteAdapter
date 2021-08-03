import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  Button,
  useColorScheme,
  StyleSheet,
  FlatList,
  Item,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CheckBox from '@react-native-community/checkbox';

import Amplify, {
  DataStore,
  AuthModeStrategyType,
  // Predicates,
  // Hub,
  // Logger,
} from 'aws-amplify';
// import awsconfig from './src/aws-exports.js';
import {Post, User, PostEditor, Comment, Profile} from './src/models';

/*

Test cases:

TODO (after 2-5)
Unauthed:
1. Sync down data for each model (will have some pre-loaded data that does not get changed while test runs)

Log-in
2. Create records for each model; ensure there are no mutation errors
3. Update records for each model; ensure no errors
4. Query records from local store; validate data; versions etc.
5. Delete * parent records for logged-in user; validate cascade behavior; validate no errors

*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
  },
  input: {
    height: 30,
    margin: 12,
    borderWidth: 1,
  },
  text: {
    fontSize: 12,
  },
  main: {
    backgroundColor: '#333',
  },
});

const Tab = createBottomTabNavigator();

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const POSTS = [];

function PostsList(posts) {
  // console.log({posts});
  // posts.forEach(post => {
  //   alert(post.title);
  // });
  return (
    <FlatList
      data={posts}
      renderItem={({item}) => <Text style={styles.item}>{item.title}</Text>}
    />
  );
}

function HomeScreen(posts) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.main}>
        <Text>Old app</Text>
      </ScrollView>
      <PostsList posts={posts} />
    </SafeAreaView>
  );
}

function NewPostScreen() {
  const initialState = {
    title: '',
    views: 0,
    metadata: {},
    draft: false,
    rating: 50.5,
  };

  const [uiState, setUiState] = useState(initialState);
  const {title, draft} = uiState;

  const inputHandler = field => value =>
    setUiState({...uiState, [field]: value});

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TextInput
          style={styles.input}
          value={title}
          placeholder="post title"
          onChangeText={inputHandler('title')}
        />
        <Text>Draft?</Text>
        <CheckBox value={draft} onValueChange={inputHandler('draft')} />
        <Button title="Create Post" testID="create-post" />
      </ScrollView>
    </SafeAreaView>
  );
}

function NewUserScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text>New User</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

// Amplify.configure(awsconfig);

DataStore.configure({
  authModeStrategyType: AuthModeStrategyType.MULTI_AUTH,
});

const App = () => {
  const [posts, setPosts] = useState([
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First POST',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second POST',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third POST',
    },
  ]);
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [postEditors, setPostEditors] = useState([]);

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  async function createPost() {
    const newPost = await DataStore.save(
      new Post({
        title: '',
        views: 0,
        metadata: {
          a: 1,
          b: 2,
        },
        draft: false,
        rating: 50.5,
      }),
    );

    console.log('Saved new post: ', newPost);
  }

  async function createComment(postID, content) {
    const newComment = await DataStore.save(
      new Comment({
        postID,
        content,
      }),
    );

    console.log('Saved new comment: ', newComment);
  }

  async function createUser(username = 'dale.dan.tony') {
    const newUser = await DataStore.save(
      new User({
        username,
      }),
    );

    console.log('Saved new user: ', newUser);
  }

  async function queryAll() {
    setPosts(await DataStore.query(Post));
    setComments(await DataStore.query(Comment));
    setUsers(await DataStore.query(User));
    setProfiles(await DataStore.query(Profile));
    setPostEditors(await DataStore.query(PostEditor));

    console.log(posts);
    console.log(comments);
    console.log(users);
    console.log(profiles);
    console.log(postEditors);
  }

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} posts={posts} />
        <Tab.Screen name="New Post" component={NewPostScreen} />
        <Tab.Screen name="New User" component={NewUserScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
