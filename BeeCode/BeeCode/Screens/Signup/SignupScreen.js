import React, { useState, useEffect} from 'react';
import {View, TextInput, Text, StatusBar, TouchableOpacity, ImageBackground, Dimensions, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ScreenOrientation from 'expo-screen-orientation';
import styles from './SignupScreen.styles.js';
import { Alert } from 'react-native';
import config from '../../config.js'; 
//import Orientation from 'react-native-orientation-locker'; // 看看哪个好

const backgroundImage = require('./res/Signup_background.jpg');
// const keyImage = require('./res/key.jpg');
// const wechatImage = require('./res/wechat.jpg');
// const smsImage = require('./res/sms.jpg');
// const signupImage = require('./res/signup.jpg');

const SignupPage = ({ navigation }) => {
  useEffect(() => {
    async function changeScreenOrientation() {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }

    changeScreenOrientation();

    return () => {
    };
  }, []);

    const [phoneNumber, setPhoneNumber] = useState('');
    const [smsCode, setSmsCode] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Function to check if passwords match
    const passwordsMatch = () => {
      return password && confirmPassword && password === confirmPassword;
    };

    const handleSMSButton = async () => {
      try {
        const smsUrl = `http://${config.SERVER_IP}:8000/api/v1/user/mobile/send_message/`;
      console.log(`Attempting to send SMS code with the URL: ${smsUrl}`);

      const response = await fetch(smsUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            mobile: phoneNumber,
          }),
        });
  
        const data = await response.json();
        if (response.ok) {
          Alert.alert('发送成功', '验证码已发送到您的手机');
        } else {
          Alert.alert('发送失败', data.message || '请重试');
        }
      } catch (error) {
        console.error('Error during sending verification code:', error);
        Alert.alert('发送失败', '网络错误，请重试');
      }
    };


  const handleSignupButton = async () => {
    if (password !== confirmPassword) {
      Alert.alert('错误', '两次输入的密码不一致');
      return;
    }

    try {
      const signupUrl = `http://${config.SERVER_IP}:8000/api/v1/user/mobile_register/mobile_registration/`;
      console.log(`Attempting to signup with the URL: ${signupUrl}`);

      const response = await fetch(signupUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobile: phoneNumber,
          code: smsCode,
          password: password,
          password_confirm: confirmPassword,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        // 显示注册成功信息，并在3秒后跳转到登录界面
        Alert.alert('注册成功', '注册成功...准备跳转登录...');
        setTimeout(() => {
          navigation.navigate('Login'); // 确保你的登录页面的路由名称正确
        }, 3000); // 等待3秒
      } else {
        Alert.alert('注册失败', data.msg || '请重试');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      Alert.alert('注册失败', '网络错误，请重试');
    }
  };

    return (
      // Your component code...
      <ImageBackground source={backgroundImage} style={{flex: 1}}>
        
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
            <View style={styles.smsCodeContainer}>
              <TextInput
                style={[styles.input, styles.smsInput]}
                placeholder="SMS Code"
                keyboardType="number-pad"
                value={smsCode}
                onChangeText={setSmsCode}
              />
              <Button title="Send" onPress={handleSMSButton} style={styles.smsButton} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
            <View style={styles.confirmPasswordContainer}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Confirm Password"
                secureTextEntry={true}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <View style={[styles.indicator, passwordsMatch() ? styles.match : styles.noMatch]} />
            </View>
            <Button title="Sign up" onPress={handleSignupButton} />
          </View>
      </ImageBackground>
    );
  }

export default SignupPage;