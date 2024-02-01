/* eslint-disable prettier/prettier */
// NotificationScreen.js

import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const notificationsData = [
  {
    id: '1',
    title: 'School Event',
    message: 'There will be a school event on December 10, 2023. All students are encouraged to participate.',
  },
  {
    id: '2',
    title: 'Exam Schedule',
    message: 'Final exams will start from January 5, 2024. Make sure to prepare well.',
  },
  // Add more notifications as needed
];

const NotificationScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.notificationContainer}>
      <Text style={styles.notificationTitle}>{item.title}</Text>
      <Text style={styles.notificationMessage}>{item.message}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notificationsData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ecf0f1',
  },
  flatListContainer: {
    paddingBottom: 20,
  },
  notificationContainer: {
    backgroundColor: '#fff',
    borderRadius: 10, 
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3498db',
  },
  notificationMessage: {
    fontSize: 16,
    color: '#7f8c8d',
    marginTop: 5,
  },
});

export default NotificationScreen;
