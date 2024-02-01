// NotificationBellButton.js

import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const NotificationBellButton = (props) => {
  // Assume you have a state or context for the notification count
  const notificationCount = 3;  // Replace with your actual notification count

  return (
    <TouchableOpacity style={styles.container} onPress={()=>{
props.navigation.navigate("Notifications");
alert("Hello");
    }}>
      <MaterialCommunityIcons name="bell" size={26} color="#fff" />
      {notificationCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{notificationCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 16,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'red',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default NotificationBellButton;
