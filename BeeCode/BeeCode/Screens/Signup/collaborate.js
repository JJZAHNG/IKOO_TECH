import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import config from '../../config.js'; // 确保你有这个配置文件

const SigninScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

const handleSendVerificationCode = async () => {
    try {
      const smsUrl = `http://${config.SERVER_IP}:8000/api/v1/user/mobile/send_message/`;
      console.log(`Attempting to send SMS code with the URL: ${smsUrl}`);

      const response = await fetch(signupUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobile: phoneNumber,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert('发送成功', '验证码已发送到您的手机');
      } else {
        Alert.alert('发送失败', data.message || '请重试');
      }
    } catch (error) {
      console.error('Error during sending verification code:', error);
      Alert.alert('发送失败', '网络错误，请重试');
    }
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('错误', '两次输入的密码不一致');
      return;
    }

    try {
      const signupUrl = `http://${config.SERVER_IP}:8000/api/v1/user/user_register/user_register/`;
      console.log(`Attempting to signup with the URL: ${smsUrl}`);

      const response = await fetch(signupUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobile: phoneNumber,
          code: verificationCode,
          password: password,
          re_password: confirmPassword,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        // 显示注册成功信息，并在3秒后跳转到登录界面
        Alert.alert('注册成功', '注册成功...准备跳转登录...');
        setTimeout(() => {
          navigation.navigate('LoginScreen'); // 确保你的登录页面的路由名称正确
        }, 3000); // 等待3秒
      } else {
        Alert.alert('注册失败', data.msg || '请重试');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      Alert.alert('注册失败', '网络错误，请重试');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="手机号"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="验证码"
        value={verificationCode}
        onChangeText={setVerificationCode}
        keyboardType="number-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="密码"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="确认密码"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <Button title="发送验证码" onPress={handleSendVerificationCode} />
      <Button title="注册" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    marginBottom: 15,
    borderWidth: 1,
    padding: 10,
  },
});

export default SigninScreen;
