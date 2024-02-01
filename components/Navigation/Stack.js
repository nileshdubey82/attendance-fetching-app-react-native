/* eslint-disable prettier/prettier */
// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screen/HomeScreen';
import NotificationScreen from '../Screen/Notification';
import ProfileScreen from '../Screen/ProfileSreen';
import AttendanceScreen from '../Screen/AttadanceScreen';
import LoginScreen from '../Screen/LoginScreen';
import BottomNavigation from './BottomNavigation';
import NotificationBellButton from '../Screen/NotificationBellButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={({ navigation }) => ({
          headerStyle: {
            backgroundColor: '#451952', // Set the header background color for all screens
          },
          headerTintColor: '#fff', // Set the text color in the header for all screens
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
              <MaterialCommunityIcons name="bell" size={26} color="#fff" />
            </TouchableOpacity>
          ),
        })}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BottomNavigation"
          component={BottomNavigation}
          options={{
            title: 'SHAKUNTALA VIDYALAYA',
            headerLeft: null,
          }}
        />
        <Stack.Screen name="Notifications" component={NotificationScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Attendance" component={AttendanceScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
