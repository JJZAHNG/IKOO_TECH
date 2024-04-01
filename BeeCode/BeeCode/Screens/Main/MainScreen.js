
import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, StatusBar, BackHandler } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import * as ScreenOrientation from 'expo-screen-orientation';
import styles from './MainScreen.styles';

// Placeholder SecondScreen component
const MainScreen = ({ navigation }) => {

  const handleButtonA = () => {
    console.log('Pressed Button 课程套件')
    navigation.navigate('Course')
    // Navigate to related page
  }

  const handleButtonB = () => {
    console.log('Pressed Button 网络课堂')
    // Navigate to related page
  }

  const handleButtonC = () => {
    console.log('Pressed Button 快速编程')
    // Navigate to related page
  }

  const handleButtonD = () => {
    console.log('Pressed Button 测评分析')
    // Navigate to related page
  }

  const handleButtonE = () => {
    console.log('Pressed Button 在线咨询')
    // Navigate to related page
  }

  const handleButtonF = () => {
    console.log('Pressed Button 会员中心')
    // Navigate to related page
  }

  const handleButtonG = () => {
    console.log('Pressed Button 设置中心')
    // Navigate to related page
  }

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

    // Handle the Android back button
    const backAction = () => {
      // You can perform any action here you deem necessary when the back button is pressed,
      // or simply return true to indicate the back action has been handled
      // and should not perform the default behavior.
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => {
      ScreenOrientation.unlockAsync();
      backHandler.remove();
    };
  }, []);
  

  // An example of what the data object could look like
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      {/* Placeholder for the left 30% of the screen */}
      <View style={styles.leftPlaceholder} />

      {/* Right side 70% of the screen with buttons */}
      <View style={styles.rightContainer}>
        {/* Wider column "A" */}
        <View style={styles.columnA}>
          <TouchableOpacity 
            style={[styles.button, styles.buttonA]}
            onPress={handleButtonA}>
            <Text style={styles.buttonText_big_bold}>课程套件</Text>
            <Text style={styles.buttonText_small_light}>AI编程, 智慧成长</Text>
          </TouchableOpacity>
        </View>

        {/* Remaining columns */}
        <View style={styles.buttonColumns}>
          {/* Column with buttons "B" and "C" */}
          <View style={styles.buttonColumn}>
            <TouchableOpacity 
              style={[styles.button, styles.buttonB]}
              onPress={handleButtonB}>
              <Text style={styles.buttonText_normal_bold}>网络课堂</Text>
              <Text style={styles.buttonText_small_light}>在家学习编程</Text>

            </TouchableOpacity>
            <TouchableOpacity 
            style={[styles.button, styles.buttonC]}
            onPress={handleButtonC}>
              <Text style={styles.buttonText_normal_bold}>快速编程</Text>
              <Text style={styles.buttonText_small_light}>自由编写脚本</Text>
            </TouchableOpacity>
          </View>

          {/* Column with buttons "D" and "E" */}
          <View style={styles.buttonColumn}>
            <TouchableOpacity
              style={[styles.button, styles.buttonD]}
              onPress={handleButtonD}>
              <Text style={styles.buttonText_normal_bold}>测评分析</Text>
              <Text style={styles.buttonText_small_light}>学习评估报告</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.buttonE]}
              onPress={handleButtonE}>
              <Text style={styles.buttonText_normal_bold}>在线咨询</Text>
              <Text style={styles.buttonText_small_light}>获取专业解答</Text>
            </TouchableOpacity>
          </View>

          {/* Column with buttons "F" and "G" */}
          <View style={styles.buttonColumn}>
            <TouchableOpacity 
              style={[styles.button, styles.buttonF]}
              onPress={handleButtonF}>
              <Text style={styles.buttonText_normal_bold}>会员中心</Text>
              <Text style={styles.buttonText_small_light}>记录学习历程</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.buttonG]}
              onPress={handleButtonG}>
              <Text style={styles.buttonText_normal_bold}>设置中心</Text>
              <Text style={styles.buttonText_small_light}>个性化设置</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MainScreen;