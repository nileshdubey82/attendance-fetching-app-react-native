/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AttendanceCard = ({ attendancePercentage, isPresentToday }) => (
  <View style={styles.card}>
    <Text style={styles.attendanceHeader}>Attendance</Text>
    {attendancePercentage !== undefined ? (
      <>
        <Text style={styles.attendancePercentage}>{`${attendancePercentage.toFixed(2)}%`}</Text>
        <Text style={styles.todayStatus}>{`Today: ${isPresentToday ? 'Present' : 'Absent'}`}</Text>
      </>
    ) : (
      <Text style={styles.loadingText}>Loading attendance...</Text>
    )}
  </View>
);


const SubjectCard = ({ subject, classTime }) => (
  <View style={styles.card}>
    <Text style={styles.subjectName}>{subject}</Text>
    <Text style={styles.classTime}>{`Class Time: ${classTime}`}</Text>
  </View>
);

const HomeScreen = () => {
  const [cardId, setCardId] = useState(null);
  const [attendanceData, setAttendanceData] = useState(null);

  const fetchCardId = async () => {
    try {
      const storedCardId = await AsyncStorage.getItem('usercardId');
      console.log('Stored Card ID:', storedCardId);
      setCardId(storedCardId);
      GetProfile(storedCardId);
    } catch (error) {
      console.error('Error fetching cardId from AsyncStorage:', error);
    }
  };

  const GetProfile = async (id) => {
    var APIURL = 'https://shakuattendance.000webhostapp.com/student/dashboard.php';
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

      console.log('Response Status:', response.status);

      const responseData = await response.json();

      if (responseData.success) {
        setAttendanceData(responseData);
      } else if (!responseData.success) {
        console.error('Error:', responseData.message);
      }

      const responseText = await response.text();
      console.log('Response Text:', responseText);
    } catch (error) {
      console.error('ERROR FOUND', error);
    }
  };

  useEffect(() => {
    fetchCardId();
  }, [GetProfile]);

  if (!attendanceData) {
    return <Text style={{ color: 'black' }}>Loading...</Text>;
  }

  const { attendancePercentage, isPresentToday, data: markedDates } = attendanceData;

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <AttendanceCard attendancePercentage={attendancePercentage} isPresentToday={isPresentToday} />

        <View style={styles.subjectContainer}>
          {/* Display subject cards */}
          {Object.entries(markedDates).map(([date, { marked, dotColor }], index) => (
            <SubjectCard
              key={index}
              subject={`Subject ${index + 1}`}
              classTime={`Class Time: 10:00 AM - 11:30 AM`} // Replace with your actual class time
            />
          ))}
        </View>

        {/* Rest of the existing code */}
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },
  attendanceHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3498db',
  },
  attendancePercentage: {
    fontSize: 18,
    color: '#2ecc71',
    marginTop: 5, 
  },
  todayStatus: {
    fontSize: 16,
    color: '#e74c3c',
    marginTop: 5,
  },
  subjectContainer: {
    marginTop: 20,
  },
  subjectName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3498db',
  },
  classTime: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 5,
  },
});

export default HomeScreen;
