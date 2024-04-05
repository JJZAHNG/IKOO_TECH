import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

const ProfileScreen = () => {
  const [username, setUsername] = useState('用户名');
  const [password, setPassword] = useState('******');

  const handleAvatarChange = () => {
    // 在这里添加上传头像的逻辑
    alert('更改头像');
  };

  const handleUsernameChange = () => {
    // 在这里添加修改用户名的逻辑
    alert('更改用户名');
  };

  const handlePasswordChange = () => {
    // 在这里添加修改密码的逻辑
    alert('更改密码');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.avatarContainer} onPress={handleAvatarChange}>
        <Text style={styles.avatarText}>头像</Text>
      </TouchableOpacity>
      <View style={styles.infoRow}>
        <Text style={styles.infoText}>{username}</Text>
        <TouchableOpacity onPress={handleUsernameChange}>
          <Text style={styles.editText}>修改</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.infoText}>{password}</Text>
        <TouchableOpacity onPress={handlePasswordChange}>
          <Text style={styles.editText}>修改</Text>
        </TouchableOpacity>
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
});

export default ProfileScreen;
