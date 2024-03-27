
import React, { useState, useEffect} from 'react';
import { View, TextInput, TouchableOpacity, Text, StatusBar } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';

import { SafeAreaView } from 'react-native-safe-area-context';
import * as ScreenOrientation from 'expo-screen-orientation';
import styles from './SMSLoginScreen.styles';


const SMSLoginScreen = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [smsCode, setSmsCode] = useState('');
    const [countryCode, setCountryCode] = useState('US');
    const [canSendCode, setCanSendCode] = useState(true);
    const [countdown, setCountdown] = useState(0);
  
    useEffect(() => {
      let interval = null;
      if (countdown > 0) {
        interval = setInterval(() => {
          setCountdown(countdown - 1);
        }, 1000);
      } else {
        setCanSendCode(true);
      }
      return () => clearInterval(interval);
    }, [countdown]);
  
    const handleSendCode = () => {
      console.log('Sending code to:', phoneNumber);
      setCanSendCode(false);
      setCountdown(60);
    };
  
    const handleLogin = () => {
      console.log('Phone Number:', phoneNumber, 'SMS Code:', smsCode);
      // Navigate to the SecondScreen upon login
      navigation.navigate('Main');
    };
  
  
    useEffect(() => {
      const lockOrientation = async () => {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
      };
  
      lockOrientation();
    }, []);
  
    return (
      
      <SafeAreaView style={styles.container}>
        <StatusBar hidden={true} />
        <View style={styles.inputContainer}>
          <CountryPicker
            {...{
              countryCode,
              withFilter: true,
              withFlag: true,
              withCountryNameButton: false,
              withAlphaFilter: true,
              withCallingCode: true,
              onSelect: (country) => {
                setCountryCode(country.cca2);
              },
            }}
            containerButtonStyle={styles.countryPicker}
          />
          <TextInput
            style={styles.input}
            placeholder="请输入电话号码"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="number-pad"
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleSendCode}
            disabled={!canSendCode}>
            <Text style={styles.buttonText_login}>
              {canSendCode ? "发送验证码" : `${countdown}秒`}
            </Text>
          </TouchableOpacity>
        </View>
  
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="请输入短信验证码"
            value={smsCode}
            onChangeText={setSmsCode}
            keyboardType="number-pad"
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}>
            <Text style={styles.buttonText}>登录</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };

  export default SMSLoginScreen;