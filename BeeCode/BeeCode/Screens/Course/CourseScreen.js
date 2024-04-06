import React, { useState } from 'react';
import { View, TouchableOpacity, Text, ScrollView, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // 确保从这个包中导入
import axios from 'axios';
import styles from './CourseScreen.styles';

const CourseScreen = ({ navigation }) => {
  const [courses, setCourses] = useState([]);

  const fetchCoursesByCategory = async (category) => {
    try {
      const response = await axios.get(`http://your-api-url/api/courses/?course_category=${category}`);
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
    <SafeAreaView style={styles.container}>
      {/* 按钮和课程方块应该在同一个 ScrollView 内 */}
      <ScrollView style={styles.scrollContainer} contentContainerStyle={{ alignItems: 'center' }}>
        <TouchableOpacity onPress={() => fetchCoursesByCategory(1)} style={styles.button}>
          <Text style={styles.buttonText}>Button 1</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => fetchCoursesByCategory(2)} style={styles.button}>
          <Text style={styles.buttonText}>Button 2</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => fetchCoursesByCategory(3)} style={styles.button}>
          <Text style={styles.buttonText}>Button 3</Text>
        </TouchableOpacity>
        {renderCourseBlocks()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CourseScreen;
