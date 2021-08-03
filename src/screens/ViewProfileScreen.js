import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TextInput,
  Pressable,
  Switch,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ViewPostScreen = ({navigation}) => {
  const {user} = navigation.state.params;

  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => {
    setIsEditing(previousState => !previousState);
  };
  const toggleSwitch = () => setIsEditing(previousState => !previousState);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.editProfileLabel}>Edit Profile</Text>
      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEditing ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEditing}
      />
      <Text style={styles.bigText}>{user.username}</Text>
    </ScrollView>
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
  editProfileLabel: {
    textAlign: 'right',
  },
  container: {
    minHeight: 100,
    marginVertical: 10,
    marginHorizontal: 10,
    display: 'flex',
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
  editCommentContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default ViewPostScreen;
