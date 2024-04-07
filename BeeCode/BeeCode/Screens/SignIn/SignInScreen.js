import React, { useState, useEffect} from 'react';
import { Image, View, TextInput, Text, StatusBar, TouchableOpacity, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ScreenOrientation from 'expo-screen-orientation';
import styles from './LoginScreen.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../config.js'; 


const backgroundImage = require('./res/Signin_background.jpg');
const keyImage = require('./res/key.jpg');
const wechatImage = require('./res/wechat.jpg');
const smsImage = require('./res/sms.jpg');
const signupImage = require('./res/signup.jpg');

<ImageBackground src={backgroundImage}>

</ImageBackground>