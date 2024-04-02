// Import React and necessary hooks
import React, { useState, useEffect} from 'react';
// Import components from React Native
import { View, TextInput, Text, StyleSheet, Button, ScrollView, Animated, Dimensions, StatusBar, TouchableOpacity } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import * as ScreenOrientation from 'expo-screen-orientation';
import styles from './LoginScreen.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../config.js'; 




const LoginScreen = ({ navigation }) => {
  console.log('LoginScreen is rendering');
  const [accountNumber, setAccountNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleDevelopmentAccess = () => {
    // Logic for direct navigation to MainScreen for development purposes
    navigation.navigate('Main');
  };

  const handleLogin = async () => {
    console.log("Login pressed");

    try {
      const response = await fetch('http://${config.SERVER_IP}:8000/api/v1/user/login/mul_login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: accountNumber,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data);
        await AsyncStorage.setItem('isLoggedIn', 'true');
        console.log('Set isLoggedIn to true...');
        navigation.navigate("Main");
      } else {
        console.error('Login failed:', data);
        // Handle login failure (e.g., show an error message)
        await AsyncStorage.setItem('isLoggedIn', 'false');
        console.log('Set isLoggedIn to false...');
        alert("Account Number or Password is not correct")
      }
    } catch (error) {
      console.error('Error during login:', error);
      // Handle network error (e.g., show an error message)
    }
  };

  const handleSignIn = () => {
    // Logic for handling sign in/navigation to sign in page
    alert('Sign In button pressed');
  };

  const handleSMSLogin = () => {
    // Logic for handling SMS login
    console.log("SMS Login pressed");
    navigation.navigate('SMSLogin')
  };

  useEffect(() => {
      console.log('Component did mount or update');
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

      return () => {
        ScreenOrientation.unlockAsync();
      };
  }, []);

  return (
    <SafeAreaView style={styles.container}>

      
      <TextInput
        style={styles.input}
        onChangeText={setAccountNumber}
        value={accountNumber}
        placeholder="电话号码 / 账号"
        keyboardType="numeric"
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, styles.passwordInput]}
          onChangeText={setPassword}
          value={password}
          placeholder="密码"
          secureTextEntry
        />

        <TouchableOpacity onPress={handleSMSLogin} style={styles.smsButton}>
          <Text style={styles.smsButtonText}>短信登录</Text>
        </TouchableOpacity>

      </View>

      
      
      <TouchableOpacity onPress={handleLogin} style={[styles.button, styles.button_login]}>
        <Text style={styles.buttonText}>登录</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSignIn} style={[styles.button, styles.button_register]}>
        <Text style={styles.buttonText}>注册</Text>
      </TouchableOpacity>

      {/* Development Button */}
      <TouchableOpacity onPress={handleDevelopmentAccess} style={styles.button_development}>
        <Text style={styles.buttonText}>开发</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};


export default LoginScreen;
