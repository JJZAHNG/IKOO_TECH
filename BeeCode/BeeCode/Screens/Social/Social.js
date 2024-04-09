import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';

const SocialScreen = () => {
  useEffect(() => {
    // 当SocialScreen组件加载时，记录消息
    console.log("BEE社区正在被加载...");

    // 模拟向后端发送请求
    fetchDataFromBackend();

    // 锁定横屏
    lockScreenOrientation();
  }, []);

  const fetchDataFromBackend = async () => {
    // 在这里发送请求到后端API
    // 假设API URL是 http://your-backend.com/api/social
    console.log("从后端获取数据...");

    // 以下是fetch请求的示例，你需要根据自己的后端API调整
    // try {
    //   const response = await fetch('http://your-backend.com/api/social');
    //   const data = await response.json();
    //   // 处理数据...
    // } catch (error) {
    //   console.error('请求失败', error);
    // }
  };

  const lockScreenOrientation = async () => {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.rectangleContainer}>
        <View style={styles.rectangle} />
        <View style={styles.rectangle} />
      </View>
      <View style={styles.rectangleContainer}>
        <View style={styles.rectangle} />
        <View style={styles.rectangle} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  rectangleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: Dimensions.get('window').width,
  },
  rectangle: {
    width: '40%',
    height: 200, // 根据需要调整
    backgroundColor: '#ddd',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // 你可能需要添加或调整更多样式
});

export default SocialScreen;
