import React from 'react';
import {  View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, ImageBackground, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SettingPage = ({navigation}) => {
  const backgroundImg = require('./res/background.jpg');
  const buttonImg = require('./res/button.jpg');
  const arrowBackImg = require('./res/arrow_back.jpg');

  const handleSignOut = async() => {    
    await AsyncStorage.setItem('isLoggedIn', 'false');
    console.log('Set isLoggedIn to false...');
    navigation.navigate("Login");
  };

  const handleWechatBinding = () => {
    console.log("Handling WeChat binding...");
    alert('更改微信');
    // Additional logic
  };

  const handleChangePhoneNumber = () => {
    console.log("Handling phone number binding...");
    alert('更改绑定手机号');
    // Additional logic
  };

  const handleChangePassword = () => {
    console.log("Handling password change...");
    alert('更改密码');
    // Additional logic
  };

  const showAboutUs = () => {
    alert('我是一头圆圆的狼');
  }

  const SettingItem = ({ title, value, onPress }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
          <Text style={styles.label}>{title}</Text>
          <View style={styles.itemContent}>
              {value && <Text style={styles.contentText}>{value}</Text>}
              <Image source={buttonImg} style={styles.buttonImg}/>
          </View>
    </TouchableOpacity>
  );

  return (
    // <View style={styles.container}>
    //   <Button
    //     title="Press Me"
    //     onPress={handleButton}
    //   />
    // </View>
    <ImageBackground source={backgroundImg} style={{flex: 1}}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={arrowBackImg}
            style={{ height: 30, width: 30, marginHorizontal: 10 }}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>设置中心</Text>
      </View>

      <View style={styles.container}>
        {/* First ScrollView for the first row of settings */}
        <ScrollView 
            horizontal={false} 
            style={styles.scrollContainer} 
            contentContainerStyle={styles.contentContainer}
            showsHorizontalScrollIndicator={false}
        >
            <SettingItem title="微信号绑定" value="狼哥" onPress={handleWechatBinding}/>
            <SettingItem title="手机号绑定" value="12345678910" onPress={handleChangePhoneNumber} />
            <SettingItem title="修改密码" onPress={handleChangePassword}/>
            <SettingItem title="注销账号" />
            <SettingItem title="退出登录" onPress={handleSignOut}/>
        </ScrollView>

        {/* Second ScrollView for the second row of settings */}
        <ScrollView 
            horizontal={false} 
            style={styles.scrollContainer} 
            contentContainerStyle={styles.contentContainer}
            showsHorizontalScrollIndicator={false}
        >
            <SettingItem title="消息通知设置" value="震动" />
            <SettingItem title="模式切换" value="青少年" />
            <SettingItem title="清除缓存" value="5.21M" />
            <SettingItem title="关于我们" onPress={showAboutUs}/>
            <SettingItem title="评分" />
        </ScrollView>
    </View>
  </ImageBackground>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',  // Aligns the back button and title horizontally
    alignItems: 'center',
    justifyContent: 'space-between',  // Positions the back button on the left and centers the title
    paddingHorizontal: 10,
    height: 60,  // Fixed height for the header
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',  // Ensures the title is centered within the available space
    fontSize: 20,
    fontWeight: '900',
    color: 'white'
  },
  container: {
    flex: 1,
    flexDirection: 'row',  // Aligns columns side by side
},
column: {
    flex: 1,  // Each column takes half the width
    padding: 10,
},
itemContainer: {
    backgroundColor: '#FDF9DB',
    borderRadius: 16,
    padding: 12,
    marginHorizontal: 16, // Space between items
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minWidth: 200, // Ensures each item has sufficient width
    height: 60,
    marginVertical: 5,

    elevation: 4, // Shadow for Android
    shadowColor: '#000', // Shadow properties are for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,

},
label: {
    color: 'black',
    fontSize: 14,
    fontWeight: '500',
    marginStart: 20,
},
itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
},
contentText: {
    color: 'black',
    fontSize: 14,
    fontWeight: '500',
    marginRight: 8, // Space between text and arrow
},
buttonImg: {
    width: 20,
    height: 30,
  },
});

export default SettingPage;

