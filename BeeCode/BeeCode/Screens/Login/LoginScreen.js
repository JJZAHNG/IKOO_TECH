// Import React and necessary hooks
import React, { useState, useEffect} from 'react';
// Import components from React Native
import { Image, View, TextInput, Text, Button, ScrollView, Animated, Dimensions, StatusBar, TouchableOpacity, ImageBackground } from 'react-native';


import { SafeAreaView } from 'react-native-safe-area-context';
import * as ScreenOrientation from 'expo-screen-orientation';
import styles from './LoginScreen.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../config.js'; 


const backgroundImage = require('./LoginScreen_background.jpg');
const keyImage = require('./key.jpg');
const wechatImage = require('./wechat.jpg');
const smsImage = require('./sms.jpg');
const signupImage = require('./signup.jpg');



const LoginScreen = ({ navigation }) => {
  console.log('LoginScreen is rendering');
  const [accountNumber, setAccountNumber] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('account');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [smsCode, setSmsCode] = useState('');
  const [account, setAccount] = useState('');



  useEffect(() => {
    const changeOrientation = async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    };
    changeOrientation();

    return () => {
      ScreenOrientation.unlockAsync(); // Unlock the orientation on cleanup
    };
  }, []);

  const handleSignUp = () => {
    console.log("handle sign up");
  };

  const handleWechat = () => {
    console.log("handle wechat");
  };


  const handleDevelopmentAccess = () => {
    // Logic for direct navigation to MainScreen for development purposes
    navigation.navigate('Main');
  };

  const handleAccountLogin = async () => {
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



  return (
    <ImageBackground source={backgroundImage} style={{flex: 1}}>
      <SafeAreaView style={styles.container}>
        <StatusBar hidden={true} />

        <View style={styles.viewEmpty}></View>

        <View style={{ width: '60%', flexDirection: 'cloumn', alignItems: 'center' }}>
          <View style={styles.tabEmpty}></View>

          
          <View style={styles.contentContainer}>
            {activeTab === 'account' && (
              <>
                <TextInput
                  style={styles.input}
                  value={account}
                  onChangeText={setAccount}
                  placeholder="    账户"
                />
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="    密码"
                  secureTextEntry
                />
                <TouchableOpacity style={styles.loginButton} onPress={handleAccountLogin}>
                  <Text style={styles.buttonText}>登录</Text>
                </TouchableOpacity>
              </>
            )}

            {activeTab === 'sms' && (
              <>
                <TextInput
                  style={styles.input}
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  placeholder="    电话号码"
                />
                <TextInput
                  style={styles.input}
                  value={smsCode}
                  onChangeText={setSmsCode}
                  placeholder="    短信验证码"
                />
                <TouchableOpacity style={styles.loginButton} onPress={handleSMSLogin}>
                  <Text style={styles.buttonText}>登录</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
          <View style={styles.optionContainer}>
            {activeTab === 'account' && (
              <>
                <TouchableOpacity onPress={() => setActiveTab('sms')}>
                  <Image source={smsImage} style={styles.buttonImage} />
                </TouchableOpacity>
              </>
            )}

            {activeTab === 'sms' && (
              <>
                <TouchableOpacity onPress={() => setActiveTab('account')}>
                  <Image source={keyImage} style={styles.buttonImage} />
                </TouchableOpacity>
              </>
            )}

            <TouchableOpacity onPress={handleSignUp}>
              <Image source={signupImage} style={styles.buttonImage} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleWechat}>
              <Image source={wechatImage} style={styles.buttonImage} />
            </TouchableOpacity>
          </View>    
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};


export default LoginScreen;
