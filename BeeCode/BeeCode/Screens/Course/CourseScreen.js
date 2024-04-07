// CourseScreen.js

import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, ScrollView, StatusBar, Alert, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './CourseScreen.styles';
import config from '../../config.js'; 

const CourseScreen = ({ navigation }) => {
  const [courseDetails, setCourseDetails] = useState({});
  const [backgroundImage, setBackgroundImage] = useState(null);

  useEffect(() => {
    // 每次courseDetails变化时，都将其记录在控制台，并存储到AsyncStorage
    if (courseDetails.cover_content) {
      console.log('保存的课程信息:', courseDetails);
      saveCourseDetailsToStorage(courseDetails);
      setBackgroundImage({ uri: courseDetails.cover_content }); // 将图片地址设置为状态
    }
  }, [courseDetails]);

  const saveCourseDetailsToStorage = async (details) => {
    try {
      const jsonValue = JSON.stringify(details);
      await AsyncStorage.setItem('courseDetails', jsonValue);
    } catch (e) {
      console.error('保存到存储失败', e);
    }
  };

  const handleCourseSelection = async (classifyId) => {
    const postUrl = `http://${config.SERVER_IP}:8000/api/v1/course/classify/classify_course/`;
    try {
      const response = await fetch(postUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ classify_id: classifyId }),
      });

      const data = await response.json();
      if (data.msg === '成功') {
        setCourseDetails(data);
      } else {
        Alert.alert('错误', '请求未成功。');
      }
    } catch (error) {
      console.error('请求出错:', error);
      Alert.alert('请求错误', '无法获取课程数据。');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <ScrollView style={styles.scrollContainer}>
        {/* 这里是滚动视图里的按钮 */}
        {/* 确保按钮列表和逻辑都被包含了 */}
        {['初级 ID - 1', '中级 ID - 2', '高级 ID - 3'].map((title, index) => (
          <TouchableOpacity
            key={index}
            style={styles.matrixButton}
            onPress={() => handleCourseSelection(index + 1)}
          >
            <Text style={styles.matrixButtonText}>{title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {backgroundImage && (
        <ImageBackground 
          source={backgroundImage} 
          style={styles.backgroundImage}
        >
          {/* 这里是大按钮组 */}
          <View style={styles.mainButtonsContainer}>
            {['初级 ID - 1', '中级 ID - 2', '高级 ID - 3'].map((title, index) => (
              <TouchableOpacity
                key={index}
                style={styles.matrixButton}
                onPress={() => handleCourseSelection(index + 1)}
              >
                <Text style={styles.matrixButtonText}>{title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ImageBackground>
      )}
    </SafeAreaView>
  );
};

export default CourseScreen;
