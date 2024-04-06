import React, { useState } from 'react';
import { View, TouchableOpacity, Text, ScrollView, Image, Alert } from 'react-native';
import axios from 'axios';
import styles from './CourseScreen.styles';

const CourseScreen = ({ navigation }) => {
  const [courses, setCourses] = useState([]);

  // 根据分类获取课程
  const fetchCoursesByCategory = async (category) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/courses/?course_category=${category}`);
      setCourses(response.data);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
      Alert.alert('Error', 'Failed to fetch courses.');
    }
  };

  // 渲染课程方块
  const renderCourseBlocks = () => {
    return courses.map((course) => (
      <TouchableOpacity key={course.id} style={styles.matrixButton} onPress={() => console.log(course.course_content)}>
        <Image style={styles.matrixButtonBackground} source={{ uri: course.course_cover }} />
        <Text style={styles.matrixButtonText}>{course.course_title}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <TouchableOpacity onPress={() => fetchCoursesByCategory(1)} style={styles.button}>
          <Text style={styles.buttonText}>Button 1</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => fetchCoursesByCategory(2)} style={styles.button}>
          <Text style={styles.buttonText}>Button 2</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => fetchCoursesByCategory(3)} style={styles.button}>
          <Text style={styles.buttonText}>Button 3</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.mainButtonsContainer}>{renderCourseBlocks()}</View>
    </SafeAreaView>
  );
};

export default CourseScreen;
