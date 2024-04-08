// CourseScreen.js

import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, ScrollView, StatusBar, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './CourseScreen.styles';
import config from '../../config.js'; 

const CourseScreen = ({ navigation }) => {
  const [courseDetails, setCourseDetails] = useState({});

  // 当课程详细信息变化时，记录在控制台
  useEffect(() => {
    if (Object.keys(courseDetails).length > 0) {
      console.log('保存的课程信息:', JSON.stringify(courseDetails, null, 2));
      // 如果需要将详情作为背景，解开注释
      // setBackgroundImage({ uri: courseDetails.cover_content });
    }
  }, [courseDetails]);

  // 当课程选择时调用
  const handleCourseSelection = async (classifyId) => {
    const postUrl = `http://${config.SERVER_IP}:8000/api/v1/course/classify/classify_course/`;
    try {
      const response = await fetch(postUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ classify_id: classifyId }),
      });

      const data = await response.json();
      if (data.msg === '成功') {
        setCourseDetails(data);
        // 保存数据到 AsyncStorage
        AsyncStorage.setItem('courseDetails', JSON.stringify(data));
      } else {
        Alert.alert('错误', '请求未成功。');
      }
    } catch (error) {
      Alert.alert('请求错误', '无法获取课程数据。');
    }
  };

  // 渲染课程按钮
  const renderCourseButtons = () => {
    return ['初级 ID - 1', '中级 ID - 2', '高级 ID - 3'].map((title, index) => (
      <TouchableOpacity
        key={title}
        style={styles.button}
        onPress={() => handleCourseSelection(index + 1)}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <ScrollView style={styles.scrollView}>
        {renderCourseButtons()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CourseScreen;
