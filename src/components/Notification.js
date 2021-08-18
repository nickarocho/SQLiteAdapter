import React, {useContext} from 'react';
import {useEffect} from 'react';
import {Animated, Text, StyleSheet, Pressable, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NotificationContext from '../context/NotificationContext';

const NotificationComponent = () => {
  const [notification, setNotification] = useContext(NotificationContext);

  // TODO: fix the auto clear timeout issue
  // const CLEAR_TIMER = 10000;
  // useEffect(() => {
  //   // Clears the notification after CLEAR_TIMER
  //   // TODO: add smooth animation to make notification less jarring
  //   setTimeout(
  //     () => setNotification({...notification, active: false}),
  //     CLEAR_TIMER,
  //   );
  // });

  return (
    <Animated.View
      testID="notification-container"
      style={[
        styles.container,
        notification.active ? styles.active : styles.inActive,
        styles.notificationText,
        notification.type === 'success'
          ? styles.successBg
          : notification.type === 'error'
          ? styles.errorBg
          : styles.defaultBg,
      ]}>
      <View style={styles.messageContainer}>
        {notification.type === 'success' ? (
          <MaterialCommunityIcons
            name="check-circle"
            color={styles.success.color}
            size={20}
          />
        ) : notification.type === 'error' ? (
          <MaterialCommunityIcons
            name="alert-circle"
            color={styles.error.color}
            size={20}
          />
        ) : (
          <MaterialCommunityIcons
            name="bell"
            color={styles.default.color}
            size={20}
          />
        )}
        <Text
          testID="notification-message"
          style={[
            styles.notificationText,
            notification.type === 'success'
              ? styles.success
              : notification.type === 'error'
              ? styles.error
              : styles.default,
          ]}>
          {notification.message}
        </Text>
      </View>
      <Pressable
        testID="btn-notification-close"
        onPress={() =>
          setNotification({...notification, message: '', active: false})
        }>
        <MaterialCommunityIcons
          name="close-circle"
          color={'#BFC6CE'}
          size={30}
        />
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 100,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    position: 'absolute',
    paddingTop: 50,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.53,
    shadowRadius: 13.97,
    elevation: 21,
  },
  messageContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    maxWidth: '80%',
  },
  notificationText: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 15,
  },
  active: {
    top: 0,
    display: 'flex',
  },
  inActive: {
    top: '-100%',
    display: 'none',
  },
  success: {
    color: '#5ecc7b',
  },
  successBg: {
    backgroundColor: '#122918',
  },
  error: {
    color: '#EB8481',
  },
  errorBg: {
    backgroundColor: '#250201',
  },
  default: {
    color: '#448780',
  },
  defaultBg: {
    backgroundColor: '#202124',
  },
});

export default NotificationComponent;
