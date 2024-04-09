console.log('App.js is loaded');

import React, { useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './Screens/Login/LoginScreen';
import SignupScreen from './Screens/Signup/SignupScreen';
import MainScreen from './Screens/Main/MainScreen';
import SMSLoginScreen from './Screens/SMSLogin/SMSLoginScreen';
import CourseScreen from './Screens/Course/CourseScreen';
import RemoteSimulator from './Screens/WorkShop/RemoteSimulator';
import ChatService from './Screens/Ai_Chat/ChatService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from './Screens/SplashScreen/SplashScreen';
import SettingScreen from './Screens/Setting/SeetingScreen';
import WorkShopScreen from './Screens/WorkShop/WorkShopScreen';
import ScratchScreen from './Screens/WorkShop/ScratchScreen'; // 更新为你的正确路径
import SocialScreen from './Screens/Social/Social'; // 确保路径正确
import ProfileScreen from './Screens/Profile/ProfileScreen'; // 确保路径正确
import StreamingClassroomScreen from './Screens/Streaming/StreamingClassroomScreen';



// Create a Stack Navigator
const Stack = createNativeStackNavigator();

// App component that sets up navigation
const App = () => {
  console.log('App is rendering');

  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [initialRouteName, setInitialRouteName] = useState('Login');

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
        console.log("isLoggedIn is", isLoggedIn);
        if (isLoggedIn === 'true') {
          setInitialRouteName('Main');
          console.log("should Initial Route Name: ", initialRouteName);

        } else {
          setInitialRouteName('Login');
        }
      } catch (error) {
        console.error('Failed to fetch login status', error);
      } finally {
        setIsInitialLoading(false);
      }
    };


    checkLoginStatus();
  }, []);

  if (isInitialLoading) {
    return <SplashScreen />; // Show splash screen or any loading indicator you prefer
  }


  return (
    <NavigationContainer>
      <Stack.Navigator
        // screenOptions={{
        //   headerStyle: {
        //     backgroundColor: '#fcbf49', // Set your own color
        //   },
        //   headerTintColor: '#fff', // Set the color for the header title and buttons
        //   headerTitleStyle: {
        //     fontWeight: '900', // Set the header title style
        //   },
        // }}
        initialRouteName={initialRouteName}>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="SMSLogin" component={SMSLoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Signup" component={SignupScreen} options={{headerShown: false}}/>
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{
            headerShown: false,            
            headerLeft: () => null, // Disables the back button in the header
            gestureEnabled: false, // Disables iOS swipe-to-go-back gesture for this screen
          }}
        />
  
        <Stack.Screen name="Course" component={CourseScreen} options={{title: "课程套件"}} />

        {/* 在线咨询界面 */}
        <Stack.Screen name="ChatService" component={ChatService} options={{ title: "在线咨询" }} />
        <Stack.Screen name="Setting" component={SettingScreen} options={{ title: "设置"}} />
        {/* ... 其他 Stack.Screen 配置 */}
        <Stack.Screen name="WorkShop" component={WorkShopScreen} options={{ title: "工作坊" }} />
        {/* Scratch编程界面 */}
        <Stack.Screen name="ScratchScreen" component={ScratchScreen} options={{ title: "Scratch编程" }} />
        {/* 添加遥控器界面 */}
        <Stack.Screen name="RemoteSimulator" component={RemoteSimulator} options={{ title: "遥控器" }} />
        <Stack.Screen name="SocialScreen" component={SocialScreen} options={{ title: "BEE社区" }} />

        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ title: "个人中心" }} />
        <Stack.Screen name="StreamingClassroomScreen" component={StreamingClassroomScreen} options={{ title: '网络课堂' }}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;