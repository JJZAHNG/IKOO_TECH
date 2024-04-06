import React, { useState, useEffect} from 'react';
import { Image, View, TextInput, Text, StatusBar, TouchableOpacity, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ScreenOrientation from 'expo-screen-orientation';
import styles from './LoginScreen.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../config.js'; 


const backgroundImage = require('./res/LoginScreen_background.jpg');
const keyImage = require('./res/key.jpg');
const wechatImage = require('./res/wechat.jpg');
const smsImage = require('./res/sms.jpg');
const signupImage = require('./res/signup.jpg');



const LoginScreen = ({ navigation }) => {
  console.log('LoginScreen is rendering');
  const [accountNumber, setAccountNumber] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('account');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [smsCode, setSmsCode] = useState('');
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(60); // 60 seconds timer



  useEffect(() => {
    // Screen orientation locking logic
    const changeOrientation = async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    };
    changeOrientation();
  
    // Timer logic
    let interval;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
      setTimerSeconds(60); // Reset timer
    }
  
    // Cleanup function
    return () => {
      clearInterval(interval); // Clear the timer interval
      ScreenOrientation.unlockAsync(); // Unlock the orientation on cleanup
    };
  }, [isTimerRunning, timerSeconds]); 

  const handleSignUp = () => {
    console.log("handle sign up");
  };

  const handleForgetPassword = () => {
    console.log("handle forget password");
  };

  const handleWechat = () => {
    console.log("handle wechat");
    navigation.navigate('Main');
  };

  const handleLogin = async () => {
    console.log("Login pressed");
  
    try {
      let response;
      let data;
  
      if (activeTab === "account") {
        const loginUrl = `http://${config.SERVER_IP}:8000/api/v1/user/login/mul_login/`;
        console.log(`Attempting to login with account URL: ${loginUrl}`);
        
        response = await fetch(loginUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: accountNumber,
            password: password,
          }),
        });
        
      } else if (activeTab === "sms") {
        const smsLoginUrl = `http://${config.SERVER_IP}:8000/api/v1/user/login/sms_login/`;
        console.log(`Attempting to login with SMS URL: ${smsLoginUrl}`);
        
        response = await fetch(smsLoginUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            mobile: phoneNumber,
            code: smsCode,
          }),
        });
      }
  
      data = await response.json();
  
      if (response.ok) {
        console.log('Login successful:', data);
        await AsyncStorage.setItem('isLoggedIn', 'true');
        console.log('Set isLoggedIn to true...');
        navigation.navigate("Main");
      } else {
        console.error('Login failed:', data);
        // 处理登录失败（例如，显示错误信息）
        await AsyncStorage.setItem('isLoggedIn', 'false');
        console.log('Set isLoggedIn to false...');
        alert("登录信息不正确");
      }
    } catch (error) {
      console.error('Error during login:', error);
      // 处理网络错误（例如，显示错误信息）
      alert(`登录错误: ${error}`);
    }
  };

  const handleSendSMS = () => {
    // Trigger SMS sending logic here
    console.log("Sending SMS to:", phoneNumber);
    setIsTimerRunning(true);
  };


  return (
    <ImageBackground source={backgroundImage} style={{flex: 1}}>
      <SafeAreaView style={styles.container}>
        <StatusBar hidden={true} />

        <View style={styles.rowEmpty}></View>

        <View style={styles.columnContainer}>
          <View style={styles.columnEmpty}></View>

          
          <View style={styles.textInputContainer}>
            {activeTab === 'account' && (
              <>
                <TextInput
                  style={styles.textInput}
                  value={accountNumber}
                  onChangeText={setAccountNumber}
                  placeholder="账户"
                />
                <TextInput
                  style={styles.textInput}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="密码"
                  secureTextEntry
                />
              </>
            )}

            {activeTab === 'sms' && (
              <>
              <View style={styles.inputWithButton}>
                <TextInput
                  style={styles.textInput}
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  placeholder="电话号码"
                  keyboardType="numeric" // Ensure numeric keyboard for phone numbers
                  maxLength={11} // Maximum length for the phone number
                />

                <TouchableOpacity 
                  onPress={handleSendSMS} 
                  disabled={phoneNumber.length !== 11 || isTimerRunning} 
                  style={[styles.sendSMSButton, (phoneNumber.length !== 11 || isTimerRunning) && { backgroundColor: 'lightgrey' }]}
                >
                  <Text style={styles.sendSMSText}>{isTimerRunning ? `${timerSeconds}s` : "发送验证码"}</Text>
                </TouchableOpacity>
              </View>
                
                <TextInput
                  style={styles.textInput}
                  value={smsCode}
                  onChangeText={setSmsCode}
                  placeholder="短信验证码"
                />
                
              </>
            )}
          </View>

          <View style={styles.loginContainer}>
            <View style={styles.forgetPasswordContainer}>
              <Text style={styles.forgetPasswordText} onPress={handleForgetPassword}>忘记密码？</Text>
            </View>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginText}>登录</Text>
             </TouchableOpacity>
          </View>

          <View style={styles.optionContainer}>
            {activeTab === 'account' && (
              <>
                <TouchableOpacity onPress={() => setActiveTab('sms')} style={styles.buttonContainer}>
                  <Image source={smsImage} style={styles.buttonImage} />
                  <Text style={styles.buttonText}>验证码登录</Text>
                </TouchableOpacity>
              </>
            )}

            {activeTab === 'sms' && (
              <>
                <TouchableOpacity onPress={() => setActiveTab('account')} style={styles.buttonContainer}>
                  <Image source={keyImage} style={styles.buttonImage} />
                  <Text style={styles.buttonText}>密码登录</Text>
                </TouchableOpacity>
              </>
            )}

            <TouchableOpacity onPress={handleSignUp} style={styles.buttonContainer}>
              <Image source={signupImage} style={styles.buttonImage} />
              <Text style={styles.buttonText}>注册账号</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleWechat} style={styles.buttonContainer}>
              <Image source={wechatImage} style={styles.buttonImage} />
              <Text style={styles.buttonText}>微信登录</Text>
            </TouchableOpacity>
          </View>    
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};


export default LoginScreen;
