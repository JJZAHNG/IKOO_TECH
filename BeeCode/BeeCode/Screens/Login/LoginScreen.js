import React, { useState, useEffect} from 'react';
import { Image, View, TextInput, Text, StatusBar, TouchableOpacity, ImageBackground } from 'react-native';
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

  const handleForgetPassword = () => {
    console.log("handle forget password");
  };

  const handleWechat = () => {
    console.log("handle wechat");
    navigation.navigate('Main');
  };

  const handleLogin = async () => {
    console.log("Login pressed");

    if (activeTab === "account") {

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
    } else if (activeTab === "sms") {
      // TODO: Handle SMS login 

    }
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
                  placeholder="    账户"
                />
                <TextInput
                  style={styles.textInput}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="    密码"
                  secureTextEntry
                />
              </>
            )}

            {activeTab === 'sms' && (
              <>
                <TextInput
                  style={styles.textInput}
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  placeholder="    电话号码"
                />
                <TextInput
                  style={styles.textInput}
                  value={smsCode}
                  onChangeText={setSmsCode}
                  placeholder="    短信验证码"
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
