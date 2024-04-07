import React, { useState } from 'react';
import { View, TouchableOpacity, Text, ScrollView, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // 确保从这个包中导入
import axios from 'axios';
import styles from './CourseScreen.styles';
import config from '../../config.js'; 

const CourseScreen = ({ navigation }) => {
  const [courses, setCourses] = useState([]);

  const fetchCoursesByCategory = async (category) => {
    const courseURL = `http://${config.SERVER_IP}:8000//api/v1/course/course_classify/${category}/`;
    try {
      const response = await axios.get(courseURL);
      setCourses(response.data);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
      Alert.alert('Error', 'Failed to fetch courses.');
    }
  };

  const renderCourseBlocks = () => {
    return courses.map((course, index) => (
      <View key={index} style={styles.matrixButton}>
        <Image
          style={{ width: '100%', height: '100%' }}
          source={{ uri: course.course_cover }}
        />
        <Text style={styles.matrixButtonText}>
          {course.course_title || `Matrix ${index + 1}`}
        </Text>
      </View>
    ));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.buttonWrapper}>
        <View style={styles.mainButtonsContainer}>
          {/* 小按钮保持原样 */}
          <TouchableOpacity style={styles.matrixButton} onPress={() => {}}>
              <Text style={styles.matrixButtonText}>ENTRY</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.matrixButton} onPress={() => {}}>
              <Text style={styles.matrixButtonText}>INTERMEDIATE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.matrixButton} onPress={() => {}}>
              <Text style={styles.matrixButtonText}>ADVANCE</Text>
            </TouchableOpacity>
          {/* ... */}
        </View>

        <View style={styles.largeButtonsContainer}>
          {/* 创建横向排列的大按钮 */}
          <TouchableOpacity style={styles.largeButton} onPress={() => console.log('大按钮1')}>
            <Image
              source={require('./res/demo.png')} // 图片路径相对于当前文件位置
              style={styles.largeButtonImage}
            />
            <Text style={styles.largeButtonText}>大按钮1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.largeButton} onPress={() => console.log('大按钮2')}>
            <Image
              source={require('./res/demo.png')} // 图片路径相对于当前文件位置
              style={styles.largeButtonImage}
            />
            <Text style={styles.largeButtonText}>大按钮2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.largeButton} onPress={() => console.log('大按钮3')}>
            <Image
              source={require('./res/demo.png')} // 图片路径相对于当前文件位置
              style={styles.largeButtonImage}
            />
            <Text style={styles.largeButtonText}>大按钮3</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default CourseScreen;
