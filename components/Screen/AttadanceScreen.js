/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Animated } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
const AttendanceScreen = () => {
  const [attendanceData, setAttendanceData] = useState({});
  const [cardId, setCardId] = useState(null);
  const fetchCardId = async () => {
    try {
      const storedCardId = await AsyncStorage.getItem('usercardId');
      setCardId(storedCardId);
      // alert(storedCardId);
    } catch (error) {
      console.error('Error fetching cardId from AsyncStorage:', error);
    }
  };
  const [selectedDate, setSelectedDate] = useState('');

  const animatedValue = new Animated.Value(0);

  const onDayPress = day => {
    setSelectedDate(day.dateString);
    animateStatusIndicator();
  };

  const animateStatusIndicator = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };



  const GetProfile = async () => {
    // alert(cardId);
    var APIURL = 'https://shakuattendance.000webhostapp.com/student/count_attadance.php';
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    };
    var Data = {
      UIDresult: `${cardId}`,
    };

    try {
      const response = await fetch(APIURL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(Data),
        cache: 'no-store',
      });

      // Log the response status
      console.log('Response Status:', response.status);

      // Parse the JSON response
      const responseData = await response.json();

      // Check if the response indicates success
      if (responseData.success) {
        // Update the state with the student data
        setAttendanceData(responseData.data);
      } else {
        console.error('Error:', responseData.message);
      }

      // Log the response text
      const responseText = await response.text();
      console.log('Response Text:', responseText);

      // Rest of your code...
    } catch (error) {
      console.error('ERROR FOUND', error);
    }
  };


  useEffect(() => {
    fetchCardId();
    GetProfile();
  }, [GetProfile]);





  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>Attendance Calendar</Text>
        {/* <Text style={styles.header}>{cardId}</Text> */}

        <Calendar
          markingType="dot"
          markedDates={{
            ...attendanceData,
            [selectedDate]: {
              selected: true,
              marked: true,
              dotColor: attendanceData[selectedDate] ? '#451952' : '#451952',
            },
          }}
          onDayPress={onDayPress}
        />

        <View style={styles.bottomContainer}>
          {selectedDate && (
            <View>
              <Text style={styles.selectedDate}>
                Selected Date: {selectedDate}
              </Text>
              {attendanceData[selectedDate] ? (
                <Text style={styles.statusText}>Status: Present</Text>
              ) : (
                <Text style={styles.statusText}>Status: Absent</Text>
              )}
            </View>
          )}
          {/* <Animated.View
            style={[
              styles.statusIndicator,
              {
                backgroundColor: attendancePercentage >= 75 ? '#451952' : '#451952',
                transform: [{ scale: statusIndicatorScale }],
              },
            ]}
          /> */}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ecf0f1',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#451952',
  },
  bottomContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  selectedDate: {
    fontSize: 16,
    marginBottom: 10,
    color: '#451952',
    fontWeight: 'bold',
  },
  statusText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#451952',
    fontWeight: 'bold',
  },
  statusIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    color: '#451952',
  },
});

export default AttendanceScreen;
