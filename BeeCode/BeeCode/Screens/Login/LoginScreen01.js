// // LoginScreen.js
// import React, { useState } from 'react';
// import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
// import styles from './LoginScreen.style';

// export default function LoginScreen({ navigation }) {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = () => {
//     // Logic to handle login
//     // This should be replaced with actual authentication logic
//     if (username === 'existing_user' && password === 'correct_password') {
//       console.log('Login Successful');
//       // Navigate to the home screen or user dashboard
//     } else {
//       console.log('User not found, redirecting to Registration');
//       // Replace with navigation to your registration screen
//       navigation.navigate('RegistrationScreen');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           onChangeText={setUsername}
//           value={username}
//           placeholder="手机号/用户名"
//         />
//         <TextInput
//           style={styles.input}
//           onChangeText={setPassword}
//           value={password}
//           placeholder="密码"
//           secureTextEntry
//         />
//         <TouchableOpacity onPress={() => console.log('Forgot Password?')}>
//           <Text style={styles.forgotPasswordText}>忘记密码?</Text>
//         </TouchableOpacity>
//       </View>
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.button} onPress={handleLogin}>
//           <Text style={styles.buttonText}>登录</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RegistrationScreen')}>
//           <Text style={styles.buttonText}>注册</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

