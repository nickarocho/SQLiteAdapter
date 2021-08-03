import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TextInput,
  Pressable,
} from 'react-native';
import Comment from '../components/Comment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ViewPostScreen = ({navigation}) => {
  const {post} = navigation.state.params;
  const [newComment, setNewComment] = useState('');

  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => {
    setIsEditing(previousState => !previousState);
  };

  const handleCommentSubmit = () => {
    // TODO: write create comment functionality
    console.log('submit comment!');
  };

  const handleUpdateComment = () => {
    // TODO: write update comment functionality
    console.log('update comment!');
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
              return (
                <Comment
                  comment={item}
                  navigation={navigation}
                  style={styles.comment}
                />
              );
            }}
          />
        </View>
        {/* TODO: edit/delete comment */}
        <View style={styles.editCommentContainer}>
          <TextInput
            value={newComment}
            onChangeText={setNewComment}
            style={styles.commentInput}
            onSubmitEditing={handleCommentSubmit}
          />
          <Pressable style={styles.icon} onPress={handleCommentSubmit}>
            <MaterialCommunityIcons name="check" color={'#1b494a'} size={30} />
          </Pressable>
        </View>
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
  editCommentContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  comment: {
    borderColor: 'rgba(0,0,0,.3)',
    borderTopWidth: 1,
    paddingVertical: 15,
    flexGrow: 1,
  },
  commentInput: {
    marginTop: 20,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 50,
    flexGrow: 1,
  },
});

export default ViewPostScreen;
