// Import React and necessary hooks
import React, { useState, useEffect} from 'react';
// Import components from React Native
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Button, ScrollView, Animated, Dimensions, StatusBar } from 'react-native';
// Import the CountryPicker from 'react-native-country-picker-modal'
import CountryPicker from 'react-native-country-picker-modal';
// Import NavigationContainer and createNativeStackNavigator from React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './Screens/Login/LoginScreen';
import MainScreen from './Screens/Main/MainScreen';
import SMSLoginScreen from './Screens/SMSLogin/SMSLoginScreen';
import CourseScreen from './Screens/Course/CourseScreen';

// Create a Stack Navigator
const Stack = createNativeStackNavigator();

// App component that sets up navigation
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#fcbf49', // Set your own color
          },
          headerTintColor: '#fff', // Set the color for the header title and buttons
          headerTitleStyle: {
            fontWeight: '900', // Set the header title style
          },
        }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SMSLogin" component={SMSLoginScreen} />
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{
            title: "主页",
            headerBackVisible: false,
            headerLeft: () => null, // Disables the back button in the header
            gestureEnabled: false, // Disables iOS swipe-to-go-back gesture for this screen
          }}
        />
        <Stack.Screen name="Course" component={CourseScreen} options={{title: "课程套件"}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
