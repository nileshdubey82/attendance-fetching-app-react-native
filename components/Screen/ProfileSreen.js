/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = (props) => {
  const [cardId, setCardId] = useState(null);
  const [student, setStudent] = useState(null);
  const intervalDelay = 5000; // Set the interval delay in milliseconds

  let fetchDataInterval; // Declare the variable outside the useEffect

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

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      props.navigation.navigate('Login');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };

  const GetProfile = async (id) => {
    let car = `${cardId}`
    // alert(car);
    var APIURL = 'https://shakuattendance.000webhostapp.com/student/getAttadance.php';
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
        clearInterval(fetchDataInterval); // Clear the interval if data is available
        setStudent(responseData.data);
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
    // const fetchData = async () => {
    fetchCardId();
    // await GetProfile();
    // };


  }, [GetProfile]);

  if (!student) {
    return <Text style={{ color: 'black' }}>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('./Images/LoginCartoon.png')} // Replace with your actual logo
          style={styles.logo}
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{student.name}</Text>
        <Text style={styles.detailText}>Email: {student.email}</Text>
        <Text style={styles.detailText}>Card Id: {student.id}</Text>
        <Text style={styles.detailText}>Mobile: {student.mobile}</Text>
        <Text style={styles.detailText}>Date of Birth: {student.dob}</Text>
        <Text style={styles.detailText}>cardId: {cardId}</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  detailsContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 3,
    width: '80%',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#451952',
  },
  detailText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#451952',
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
    borderRadius: 10,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default ProfileScreen;
