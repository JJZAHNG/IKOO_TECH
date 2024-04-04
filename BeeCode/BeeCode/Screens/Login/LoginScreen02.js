// // LoginScreen.js
// import React, { useState } from 'react';
// import { View, TextInput, TouchableOpacity, Text } from 'react-native';
// import styles from './LoginScreen.styles';

// const LoginScreen = ({ navigation }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = () => {
//     // Here you would add your login logic
//     // For now, we will just log the credentials
//     console.log(username, password);
//     // If login is successful, navigate to the 'Main' screen
//     // navigation.navigate('Main');
//   };

//   const handleRegistration = () => {
//     // Here you would handle user registration or navigation to the registration screen
//     console.log('Navigate to registration');
//     // navigation.navigate('Registration');
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         placeholder="手机号/用户名"
//         value={username}
//         onChangeText={setUsername}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="密码"
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//       />
//       <TouchableOpacity onPress={() => console.log('Forgot Password')}>
//         <Text style={styles.forgotPassword}>忘记密码?</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.button} onPress={handleLogin}>
//         <Text style={styles.buttonText}>登录</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.button} onPress={handleRegistration}>
//         <Text style={styles.buttonText}>注册</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default LoginScreen;
