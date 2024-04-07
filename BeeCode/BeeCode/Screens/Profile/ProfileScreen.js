import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const [userData, setUserData] = useState({
    username: '加载中...',
    icon: null,
    isVIP: '加载中...',
  });

  useEffect(() => {
    const getUserData = async () => {
      const storedUserData = await AsyncStorage.getItem('userData');
      if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        setUserData({
          username: userData.username || '用户名',
          icon: userData.icon || 'http://127.0.0.1:8000/media/icon/default.png', // 默认头像
          isVIP: userData.isVIP || '非会员', // 默认会员状态
        });
      }
    };


    getUserData();
  }, []);

  const handleAvatarChange = () => {
    alert('更改头像');
  };

  const handleUsernameChange = () => {
    alert('更改用户名');
  };

  const handleVIP = () => {
    alert('升级会员');
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.avatarContainer} onPress={handleAvatarChange}>
        {userData.icon ? (
          <Image source={{ uri: userData.icon }} style={styles.avatarImage} />
        ) : (
          <Text style={styles.avatarText}>头像</Text>
        )}
      </TouchableOpacity>
      <View style={styles.infoRow}>
        <Text style={styles.infoText}>{userData.username}</Text>
        {/* 修改用户名逻辑保持不变 */}
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.infoText}>******</Text>
        {/* 密码逻辑保持不变 */}
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.infoText}>{userData.isVIP}</Text>
        {/* 会员状态逻辑保持不变 */}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fcbf49',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  infoText: {
    fontSize: 18,
    marginRight: 10,
  },
  editText: {
    fontSize: 16,
    color: '#007bff',
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default ProfileScreen;
