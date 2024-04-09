
import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, StatusBar, BackHandler, ImageBackground } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import * as ScreenOrientation from 'expo-screen-orientation';
import styles from './MainScreen.styles';
import CourseScreen from '../Course/CourseScreen';
import StreamingClassroomScreen from '../Streaming/StreamingClassroomScreen';

const backgroundImage = require('./res/MainScreen_background.jpg');
const courseImage = require('./res/course_image.jpg'); // 课程套件
// const profileImage = require('./res/profile_image.jpg'); // 个人中心
const onlineCourseImage = require('./res/onlineCourse_image.jpg'); // 网络课堂
const workShopImage = require('./res/workShop_image.jpg'); // 机械工坊
const testAnalysisImage = require('./res/testAnalysis_image.jpg'); // 测评分析
const chatServiceImage = require('./res/chatService_image.jpg'); // 在线咨询
const socialCenterImage = require('./res/socialCenter_image.jpg'); // 会员中心
const settingsImage = require('./res/settings_image.jpg'); // 设置中心




// Placeholder SecondScreen component
const MainScreen = ({ navigation }) => {
  const handleAccountButton = () => {
    console.log('Pressed Button 个人中心');
    navigation.navigate('ProfileScreen');
  }

  const handleButtonA = () => {
    console.log('Pressed Button 课程套件');
    navigation.navigate('Course');
    // Navigate to related page
  }

  const handleButtonB = () => {
    console.log('Pressed Button 网络课堂');
    // Navigate to StreamingClassroomScreen
    navigation.navigate('StreamingClassroomScreen');
  }

  const handleButtonC = () => {
    console.log('Pressed Button 快速编程');
    // Navigate to related page
    navigation.navigate('WorkShop'); // 更新为导航到 WorkShopScreen
  }

  const handleButtonD = () => {
    console.log('Pressed Button 在线咨询');
    // Navigate to related page
    navigation.navigate('ChatService'); // 使用 'ChatService' 导航到聊天界面

  }

  const handleButtonE = () => {
    console.log('Pressed Button 测评分析');
    // Navigate to related page
  }

  const handleButtonF = () => {
    console.log('Pressed Button Bee社区');
    // Navigate to related page
    navigation.navigate('SocialScreen');
  }

  const handleButtonG = () => {
    console.log('Pressed Button 设置中心');
    // Navigate to related page
    navigation.navigate('Setting');
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
    <ImageBackground source={backgroundImage} style={{flex: 1}}>
      <SafeAreaView style={styles.container}>
        <StatusBar hidden={true} />
        {/* Placeholder for the left 30% of the screen */}
        <View style={styles.AccountButtonContainer}>
          <TouchableOpacity
          style={styles.AccountButton}
          onPress={handleAccountButton}>
            <Text style={styles.AccountButtonText}>个人</Text>
          </TouchableOpacity>
        </View>

        {/* Right side 70% of the screen with buttons */}
        <View style={styles.rightContainer}>
          {/* Wider column "A" */}
          <View style={styles.columnA}>
            <TouchableOpacity 
              style={[styles.button, styles.buttonA]}
              onPress={handleButtonA}>
              <ImageBackground source={courseImage} style={styles.buttonImage} resizeMode='cover' >

                <Text 
                  style={styles.buttonText_big_bold} 
                  numberOfLines={1} 
                  ellipsizeMode="tail"
                >课程套件</Text>
                <Text 
                  style={styles.buttonText_small_light}
                  numberOfLines={1} 
                  ellipsizeMode="tail"
                >AI编程, 智慧成长</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
          

          {/* Remaining columns */}
          <View style={styles.buttonColumns}>
            {/* Column with buttons "B" and "C" */}
            <View style={styles.buttonColumn}>
              <TouchableOpacity 
                style={[styles.button, styles.buttonB]}
                onPress={handleButtonB}>
                <ImageBackground source={onlineCourseImage} style={styles.buttonImage} resizeMode='cover' >

                <Text 
                  style={styles.buttonText_normal_bold}
                  numberOfLines={1} 
                  ellipsizeMode="tail"
                >网络课堂</Text>
                <Text 
                  style={styles.buttonText_small_light}
                  numberOfLines={1} 
                  ellipsizeMode="tail"
                >在家学习编程</Text>
                </ImageBackground>

              </TouchableOpacity>
              <TouchableOpacity 
              style={[styles.button, styles.buttonC]}
              onPress={handleButtonC}>
                <ImageBackground source={workShopImage} style={styles.buttonImage} resizeMode='cover' >

                <Text 
                  style={styles.buttonText_normal_bold}
                  numberOfLines={1} 
                  ellipsizeMode="tail"
                >机械工坊</Text>
                <Text 
                  style={styles.buttonText_small_light}
                  numberOfLines={1} 
                  ellipsizeMode="tail"
                >自由编写脚本</Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>

            {/* Column with buttons "D" and "E" */}
            <View style={styles.buttonColumn}>
              <TouchableOpacity
                style={[styles.button, styles.buttonD]}
                onPress={handleButtonD}>
                <ImageBackground source={chatServiceImage} style={styles.buttonImage} resizeMode='cover' >
                  <Text 
                    style={styles.buttonText_normal_bold}
                    numberOfLines={1} 
                    ellipsizeMode="tail"
                  >在线咨询</Text>
                  <Text 
                    style={styles.buttonText_small_light}
                    numberOfLines={1} 
                    ellipsizeMode="tail"
                  >学习评估报告
                  </Text>
                </ImageBackground>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.button, styles.buttonE]}
                onPress={handleButtonE}>
                <ImageBackground source={testAnalysisImage} style={styles.buttonImage} resizeMode='cover' >
                  <Text 
                    style={styles.buttonText_normal_bold}
                    numberOfLines={1} 
                    ellipsizeMode="tail"
                  >测评分析</Text>
                  <Text 
                    style={styles.buttonText_small_light}
                    numberOfLines={1} 
                    ellipsizeMode="tail"
                  >获取专业解答
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>

            {/* Column with buttons "F" and "G" */}
            <View style={styles.buttonColumn}>
              <TouchableOpacity 
                style={[styles.button, styles.buttonF]}
                onPress={handleButtonF}>
                  <ImageBackground source={socialCenterImage} style={styles.buttonImage} resizeMode='cover' >

                <Text 
                  style={styles.buttonText_normal_bold}
                  numberOfLines={1} 
                  ellipsizeMode="tail"
                >马蜂窝</Text>
                <Text 
                  style={styles.buttonText_small_light}
                  numberOfLines={1} 
                  ellipsizeMode="tail"
                >记录学习历程</Text>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.button, styles.buttonG]}
                onPress={handleButtonG}>
                <ImageBackground source={settingsImage} style={styles.buttonImage} resizeMode='cover' >
                  <Text 
                    style={styles.buttonText_normal_bold}
                    numberOfLines={1} 
                    ellipsizeMode="tail"
                  >设置中心</Text>
                  <Text 
                    style={styles.buttonText_small_light}
                    numberOfLines={1} 
                    ellipsizeMode="tail"
                  >个性化设置
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>

  );
};

export default MainScreen;