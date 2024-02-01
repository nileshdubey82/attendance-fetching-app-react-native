import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AttadanceScreen from '../Screen/AttadanceScreen';
import ProfileScreen from '../Screen/ProfileSreen';
import HomeScreen from '../Screen/HomeScreen';
const Tab = createMaterialBottomTabNavigator();

function BottomNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      activeColor="white"
      barStyle={{ backgroundColor: '#451952' }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}  // Corrected component name
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Attendance"
        component={AttadanceScreen}  // Corrected component name
        options={{
          tabBarLabel: 'Attendance',  // Corrected label
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',  // Corrected label
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomNavigation;