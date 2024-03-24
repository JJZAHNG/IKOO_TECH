// Import React and necessary hooks
import React, { useState, useEffect} from 'react';
// Import components from React Native
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Button, ScrollView, Animated, Dimensions, StatusBar } from 'react-native';
// Import the CountryPicker from 'react-native-country-picker-modal'
import CountryPicker from 'react-native-country-picker-modal';
// Import NavigationContainer and createNativeStackNavigator from React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import Main from 'react-native-country-picker-modal';
import { SafeAreaView } from 'react-native-safe-area-context';

// Create a Stack Navigator
const Stack = createNativeStackNavigator();


// HomeScreen component containing the main logic and UI
const LoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [smsCode, setSmsCode] = useState('');
  const [countryCode, setCountryCode] = useState('US');
  const [canSendCode, setCanSendCode] = useState(true);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let interval = null;
    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else {
      setCanSendCode(true);
    }
    return () => clearInterval(interval);
  }, [countdown]);

  const handleSendCode = () => {
    console.log('Sending code to:', phoneNumber);
    setCanSendCode(false);
    setCountdown(60);
  };

  const handleLogin = () => {
    console.log('Phone Number:', phoneNumber, 'SMS Code:', smsCode);
    // Navigate to the SecondScreen upon login
    navigation.navigate('Main');
  };

  return (
    
    <SafeAreaView style={styles.container_login}>
      <StatusBar hidden={true} />
      <View style={styles.inputContainer_login}>
        <CountryPicker
          {...{
            countryCode,
            withFilter: true,
            withFlag: true,
            withCountryNameButton: false,
            withAlphaFilter: true,
            withCallingCode: true,
            onSelect: (country) => {
              setCountryCode(country.cca2);
            },
          }}
          containerButtonStyle={styles.countryPicker}
        />
        <TextInput
          style={styles.input_login}
          placeholder="请输入电话号码"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="number-pad"
        />
        <TouchableOpacity
          style={styles.button_login}
          onPress={handleSendCode}
          disabled={!canSendCode}>
          <Text style={styles.buttonText_login}>
            {canSendCode ? "发送验证码" : `${countdown}秒`}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer_login}>
        <TextInput
          style={styles.input_login}
          placeholder="请输入短信验证码"
          value={smsCode}
          onChangeText={setSmsCode}
          keyboardType="number-pad"
        />
        <TouchableOpacity
          style={styles.button_login}
          onPress={handleLogin}>
          <Text style={styles.buttonText_login}>登录</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};


// Placeholder SecondScreen component
const MainScreen = ({ navigation }) => {

  const handleButtonA = () => {
    console.log('Pressed Button 课程套件')
    navigation.navigate('Course')
    // Navigate to related page
  }

  const handleButtonB = () => {
    console.log('Pressed Button 网络课堂')
    // Navigate to related page
  }

  const handleButtonC = () => {
    console.log('Pressed Button 快速编程')
    // Navigate to related page
  }

  const handleButtonD = () => {
    console.log('Pressed Button 测评分析')
    // Navigate to related page
  }

  const handleButtonE = () => {
    console.log('Pressed Button 在线咨询')
    // Navigate to related page
  }

  const handleButtonF = () => {
    console.log('Pressed Button 会员中心')
    // Navigate to related page
  }

  const handleButtonG = () => {
    console.log('Pressed Button 设置中心')
    // Navigate to related page
  }
  

  // An example of what the data object could look like
  return (
    <SafeAreaView style={styles.container_home}>
      <StatusBar hidden={true} />
      {/* Placeholder for the left 30% of the screen */}
      <View style={styles.leftPlaceholder_home} />

      {/* Right side 70% of the screen with buttons */}
      <View style={styles.rightContainer_home}>
        {/* Wider column "A" */}
        <View style={styles.columnA_home}>
          <TouchableOpacity 
            style={[styles.button_home, styles.buttonA_home]}
            onPress={handleButtonA}>
            <Text style={styles.buttonText_home_big_bold}>课程套件</Text>
            <Text style={styles.buttonText_home_small_light}>AI编程, 智慧成长</Text>
          </TouchableOpacity>
        </View>

        {/* Remaining columns */}
        <View style={styles.buttonColumns_home}>
          {/* Column with buttons "B" and "C" */}
          <View style={styles.buttonColumn_home}>
            <TouchableOpacity 
              style={[styles.button_home, styles.buttonB_home]}
              onPress={handleButtonB}>
              <Text style={styles.buttonText_home_normal_bold}>网络课堂</Text>
              <Text style={styles.buttonText_home_small_light}>在家学习编程</Text>

            </TouchableOpacity>
            <TouchableOpacity 
            style={[styles.button_home, styles.buttonC_home]}
            onPress={handleButtonC}>
              <Text style={styles.buttonText_home_normal_bold}>快速编程</Text>
              <Text style={styles.buttonText_home_small_light}>自由编写脚本</Text>
            </TouchableOpacity>
          </View>

          {/* Column with buttons "D" and "E" */}
          <View style={styles.buttonColumn_home}>
            <TouchableOpacity
              style={[styles.button_home, styles.buttonD_home]}
              onPress={handleButtonD}>
              <Text style={styles.buttonText_home_normal_bold}>测评分析</Text>
              <Text style={styles.buttonText_home_small_light}>学习评估报告</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button_home, styles.buttonE_home]}
              onPress={handleButtonE}>
              <Text style={styles.buttonText_home_normal_bold}>在线咨询</Text>
              <Text style={styles.buttonText_home_small_light}>获取专业解答</Text>
            </TouchableOpacity>
          </View>

          {/* Column with buttons "F" and "G" */}
          <View style={styles.buttonColumn_home}>
            <TouchableOpacity 
              style={[styles.button_home, styles.buttonF_home]}
              onPress={handleButtonF}>
              <Text style={styles.buttonText_home_normal_bold}>会员中心</Text>
              <Text style={styles.buttonText_home_small_light}>记录学习历程</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button_home, styles.buttonG_home]}
              onPress={handleButtonG}>
              <Text style={styles.buttonText_home_normal_bold}>设置中心</Text>
              <Text style={styles.buttonText_home_small_light}>个性化设置</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};


const screenHeight = Dimensions.get('window').height;
const CourseScreen = ({ navigation }) => {
 
  
  const [selectedButton, setSelectedButton] = useState(1); // Assuming the first button is initially selected

  // Dummy buttons for demonstration. Ideally, this could come from props or state.
  const buttons = [
    { id: 1, title: 'Button 1' },
    { id: 2, title: 'Button 2' },
    { id: 3, title: 'Button 3' },
  ];

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    const centerPosition = scrollPosition + screenHeight / 2;

    // Logic to determine which button is at the center and thus selected
    const buttonHeight = screenHeight / buttons.length; // Adjust based on your UI
    const selectedButtonIndex = Math.floor(centerPosition / buttonHeight);
    setSelectedButton(buttons[selectedButtonIndex]?.id);
  };

  return (
    <SafeAreaView style={styles.container_course}>
      <StatusBar hidden={true} />
      <ScrollView
        style={styles.scrollContainer_course}
        onScroll={handleScroll}
        scrollEventThrottle={16} // Adjust based on your needs for performance
      >
        {buttons.map((button) => (
          <View key={button.id} style={styles.scroolButtonContainer_course}>
            <Button
              title={button.title}
              onPress={() => console.log(`${button.title} pressed`)}
              color={selectedButton === button.id ? 'blue' : 'gray'} // Highlight the selected button
            />
          </View>
        ))}
      </ScrollView>
      

      <View style={styles.mainButtonsContainer_course}>
        {['I', 'II', 'III'].map((matrixNumber) => (
          <TouchableOpacity
            key={`Matrix ${matrixNumber}`}
            style={styles.matrixButton_course}
            onPress={() => handleMatrixPress(matrixNumber)}
          >
            <Text style={styles.matrixButtonText_course}>{`Matrix ${matrixNumber}`}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}



// Styles for the components
const styles = StyleSheet.create({

  /********************************* Styles for Login Page **************************************/
  container_login: {
    flex: 70,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  inputContainer_login: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 30,
    marginBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,
    width: '100%',
  },
  input_login: {
    flex: 1,
    paddingVertical: 15,
    paddingLeft: 15,
    paddingRight: 90,
    borderRadius: 30,
  },
  button_login: {
    position: 'absolute',
    right: 10,
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  buttonText_login: {
    color: 'white',
  },


  /********************************* Styles for Home Page **************************************/
  container_home: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
  },
  leftPlaceholder_home: {
    width: '25%',
    backgroundColor: '#d3d3d3', // Example placeholder color
  },
  rightContainer_home: {
    width: '75%',
    flexDirection: 'row',
    padding: 20,
    marginRight: 10,
  },
  columnA_home: {
    width: '35%',
    marginRight: 10, // Add space between the columns
  },
  buttonColumns_home: {
    flexDirection: 'row',
    flex: 1,
  },
  buttonColumn_home: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 5, // Adjust spacing as needed
  },
  button_home: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderRadius: 30,
    padding: 15,
    marginBottom: 10,
    flex: 1,

    // Shadow Settings
    elevation: 4, // Shadow for Android
    shadowColor: '#000', // Shadow properties are for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  buttonText_home_normal_bold: {
    fontSize: 20,
    fontWeight: '900',
    color: '#fff',
  },

  buttonText_home_big_bold: {
    fontSize: 26,
    fontWeight: '900',
    color: '#fff',
  },

  buttonText_home_small_light: {
    fontSize: 11,
    fontWeight: '600',
    color: '#fff',
  },

  buttonA_home: {
    backgroundColor: '#77dd77',
    flex: 1, // Take up the full height of the column
    marginBottom: 10, // No margin at the bottom for "A"
  },
  buttonB_home: {
    backgroundColor: '#ff6961',
  },
  buttonC_home: {
    backgroundColor: '#fdb147',
  },
  buttonD_home: {
    backgroundColor: '#ffec61',
  },
  buttonE_home: {
    backgroundColor: '#a7d129',
  },
  buttonF_home: {
    backgroundColor: '#29b6f6',
  },
  buttonG_home: {
    backgroundColor: '#ba68c8',
  },


  /********************************* Styles for Course Page **************************************/

  container_course: {
    flex: 1,
    flexDirection: 'row', // Horizontal layout for two main sections
    backgroundColor: '#f0f0f0', // Background color for the entire view
  },
  scrollContainer_course: {
    width: '30%', // Left 30% of the screen
    height: screenHeight,
  },
  scroolButtonContainer_course: {
    height: 100, // Set a fixed height for each button container to ensure they can be scrolled through
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainButtonsContainer_course: {
    width: '75%',
    flexDirection: 'row', // Align buttons in a row
    justifyContent: 'space-evenly', // Evenly distribute space among buttons
    alignItems: 'center', // Vertically center the buttons
    padding: 10,
  },
  matrixButton_course: {
    backgroundColor: '#77dd77',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: '60%', // You can adjust the height
    flex: 1, // Each button will take 1/3 of the space
    marginHorizontal: 10, // Add some space between the buttons
    // Add shadows as desired
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  matrixButtonText_course: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10, // Space above the icon
  },
  matrixButtonIcon_course: {
    // Icon styling could go here
  },


});

// App component that sets up navigation
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#fcbf49', // Set your own color
          },
          headerTintColor: '#fff', // Set the color for the header title and buttons
          headerTitleStyle: {
            fontWeight: '900', // Set the header title style
          },
        }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={MainScreen} options={{title: "主页"}} />
        <Stack.Screen name="Course" component={CourseScreen} options={{title: "课程套件"}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
