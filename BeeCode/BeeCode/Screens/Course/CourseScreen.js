import React, { useState } from 'react';
import { View, TouchableOpacity, Text, ScrollView, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // 确保从这个包中导入
import axios from 'axios';
import styles from './CourseScreen.styles';

const CourseScreen = ({ navigation }) => {
  const [courses, setCourses] = useState([]);

  const fetchCoursesByCategory = async (category) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/v1/course/course_classify/${category}/`);
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
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
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
      <View style={styles.coursesContainer}>
        {renderCourseBlocks()}
      </View>
    </View>
  );
};

export default CourseScreen;
