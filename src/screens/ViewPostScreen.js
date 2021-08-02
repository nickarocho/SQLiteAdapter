import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TextInput,
} from 'react-native';

const ViewPostScreen = ({navigation}) => {
  const {post} = navigation.state.params;
  const [newComment, setNewComment] = useState('');

  const handleCommentSubmit = () => {
    // TODO: write create comment functionality
    console.log('submit comment!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.bigText}>{post.title}</Text>
      <View>
        <View style={styles.commentContainer}>
          <Text style={styles.commentLabel}>
            Comments ({post.comments.length})
          </Text>
          <FlatList
            keyExtractor={comment => comment.id}
            data={post.comments}
            renderItem={({item}) => {
              return <Text style={styles.comment}>{item.body}</Text>;
            }}
          />
        </View>
        {/* TODO: edit/delete comment */}
        <TextInput
          value={newComment}
          onChangeText={setNewComment}
          style={styles.commentInput}
          onSubmitEditing={handleCommentSubmit}
        />
      </View>
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
  heading: {
    fontSize: 25,
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
  smallText: {
    marginTop: 5,
    fontSize: 15,
    color: 'black',
  },
  bigText: {
    fontSize: 20,
    color: 'black',
  },
  commentLabel: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
    marginVertical: 10,
  },
  commentContainer: {
    borderColor: 'rgba(0,0,0,.3)',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  comment: {
    borderColor: 'rgba(0,0,0,.3)',
    borderTopWidth: 1,
    paddingVertical: 15,
  },
  commentInput: {
    marginTop: 20,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 50,
  },
});

export default ViewPostScreen;
