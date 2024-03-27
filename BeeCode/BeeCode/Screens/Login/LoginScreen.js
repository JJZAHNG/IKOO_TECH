// Import React and necessary hooks
import React, { useState, useEffect} from 'react';
// Import components from React Native
import { View, TextInput, Text, StyleSheet, Button, ScrollView, Animated, Dimensions, StatusBar, TouchableOpacity } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import * as ScreenOrientation from 'expo-screen-orientation';
import styles from './LoginScreen.styles';


const LoginScreen = ({ navigation }) => {
  const [accountNumber, setAccountNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Logic for handling login
    console.log("Login pressed");
    navigation.navigate("Main");
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
    </SafeAreaView>
  );
};


export default LoginScreen;
