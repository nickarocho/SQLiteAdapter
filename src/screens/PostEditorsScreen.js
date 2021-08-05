import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  ScrollView,
} from 'react-native';
import PostEditorComponent from '../components/PostEditor';

import {DataStore} from 'aws-amplify';
import {PostEditor} from '../models';

const PostEditorsScreen = ({navigation}) => {
  const [postEditors, updatePostEditors] = useState([]);

  useEffect(() => {
    fetchPostEditors();
    const postEditorSubscription = DataStore.observe(PostEditor).subscribe(
      async () => {
        try {
          fetchPostEditors();
        } catch (err) {
          console.error('Error fetching posts: ', err);
        }
      },
    );
    return () => {
      postEditorSubscription.unsubscribe();
    };
  }, []);

  const fetchPostEditors = async () => {
    try {
      const allPostEditors = await DataStore.query(PostEditor);
      console.log({allPostEditors});
      updatePostEditors(allPostEditors);
    } catch (err) {
      console.error('something went wrong with fetchPostEditors:', err);
    }
  };

  return (
    <ScrollView>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Post Editors ({postEditors.length})</Text>
        <Button
          style={styles.addPostBtn}
          onPress={() => navigation.navigate('Users')}
          title="View All Users"
          testID="btn-navigate-new-user"
          color="black"
        />
      </View>
      <FlatList
        keyExtractor={pe => pe.id}
        data={postEditors}
        renderItem={({item}) => {
          return (
            <PostEditorComponent
              navigation={navigation}
              fetchPostEditors={fetchPostEditors}
              editorModel={{...item}}
            />
          );
        }}
      />
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

export default PostEditorsScreen;