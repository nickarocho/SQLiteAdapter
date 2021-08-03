import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Button,
} from 'react-native';

const NewUserScreen = ({navigation}) => {
  const [newUser, setNewUser] = useState('');
  return (
    <SafeAreaView>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>🖋 Create a New User</Text>
      </View>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={setNewUser}
          value={newUser}
          placeholder="Create a new user..."
          multiline
          numberOfLines={4}
        />
      </View>
      <Button
        onPress={() => navigation.navigate('Users')}
        title="Create User"
        color="#000000"
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
  input: {
    marginVertical: 10,
    marginHorizontal: 10,
    paddingHorizontal: 20,
    borderColor: 'rgba(0,0,0,.2)',
    borderWidth: 5,
    borderRadius: 10,
    padding: 10,
    fontSize: 20,
  },
  heading: {
    fontSize: 25,
  },
});

export default NewUserScreen;
