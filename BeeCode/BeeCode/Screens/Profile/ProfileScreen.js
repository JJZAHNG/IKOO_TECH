import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import config from '../../config.js'; 

// `http://${config.SERVER_IP}:8000/api/v1/user/acctCenter/${userId}/`

const ProfileScreen = () => {
  const [userData, setUserData] = useState({
    username: '加载中...',
    bg_img: null,
    icon: null,
    isVIP: '加载中...',
    id: '', // 用户ID
  });

  const tempUSerImage = require('./res/user.jpg');
  // const tempBackgroundImg = require('./res/background.jpg');
  const tempButtonImg = require('./res/qrButton.jpg');
  const tempThumbnails = [
    { id: 1, src: require('./res/test1.jpg'), title: 'Image 1' },
    { id: 2, src: require('./res/test2.jpg'), title: 'Image 2' },
    { id: 3, src: require('./res/test3.jpg'), title: 'Image 3' },
    { id: 4, src: require('./res/test4.jpg'), title: 'Image 4' },
    { id: 5, src: require('./res/test5.jpg'), title: 'Image 5' },
  ];

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (userId !== null) {
          const response = await fetch(`http://${config.SERVER_IP}:8000/api/v1/user/acctCenter/${userId}/`);
          const json = await response.json();
          setUserData({
            ...userData,
            username: json.username,
            bg_img: json.bg_img.startsWith('http') ? json.bg_img : `http://${config.SERVER_IP}:8000${json.bg_img}`, // 确保URL格式正确
            introduction: json.introduction,
          });
        } else {
          // 处理未找到userId的情况
          console.log('UserId not found');
        }
      } catch (error) {
        console.error(error);
      }
    };
    getUserProfile();
  }, []);
  

  const handleAvatarClick = () => {
    alert('更改头像');
  };

  const handleUsernameChange = () => {
    alert('更改用户名');
  };

  const handleVIP = () => {
    alert('升级会员');
  }

  const handleQRImagePress = () => {
    alert('展示二维码');
  }

  const handleIntroPress = () => {
    alert('更改用户签名');
  }

  const showSubscriber = () => {
    alert('展示订阅账号');
  }

  const showFollower = () => {
    alert('展示粉丝列表');
  }

  return (

    <View style={styles.container}>
      <View style={styles.leftPanel}>
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: userData.bg_img }}
            style={styles.backgroundImage}
          />
          <TouchableOpacity onPress={handleAvatarClick}>
            <Image
              source={ tempUSerImage } // Change this path to your head portrait image
              style={styles.avatar}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleUsernameChange}>
            <Text style={styles.name}>狼狼</Text>
          </TouchableOpacity>
          <View style={styles.qrColumn}>
            <Text style={styles.userId}>66666666</Text>
            <TouchableOpacity onPress={handleQRImagePress}>
              <Image
                source={tempButtonImg}  // This should be your clickable image
                style={styles.clickableImage}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={handleIntroPress}>
            <Text style={styles.introduction}>用户简介：圆圆的狼狼</Text>
          </TouchableOpacity>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={showSubscriber}>
              <Text>关注</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={showFollower}>
              <Text>粉丝</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.rightPanel}>
        <View style={styles.column}>
          <Text style={styles.columnHeader}>收藏作品</Text>
          <ScrollView horizontal>
          {tempThumbnails.map((item) => (
            <TouchableOpacity key={item.id} onPress={() => alert('点击图片')} style={styles.thumbnailContainer}>
              <Image source={item.src} style={styles.thumbnail} />
            </TouchableOpacity>
          ))}
          </ScrollView>
        </View>
        <View style={styles.column}>
          <Text style={styles.columnHeader}>我的作品</Text>
          <ScrollView horizontal>
          {tempThumbnails.map((item) => (
            <TouchableOpacity key={item.id} onPress={() => alert('点击图片')} style={styles.thumbnailContainer}>
              <Image source={item.src} style={styles.thumbnail} />
            </TouchableOpacity>
          ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
  },
  leftPanel: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  rightPanel: {
    flex: 0.7,
    padding: 10,
    flexDirection: 'column'
  },
  profileContainer: {
    alignItems: 'center',
    height: '100%'
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: 10,
  },
  name: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    paddingHorizontal: 20,
    paddingVertical: 4,
    alignSelf: 'center',
  },
  userId: {
    marginTop: 5,
    fontSize: 16,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    paddingHorizontal: 20,
    paddingVertical: 4,
    marginRight: 10,
  },
  introduction: {
    marginVertical: 5,
    paddingHorizontal: 20,
    textAlign: 'center',
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    paddingHorizontal: 20,
    paddingVertical: 4,
  },

  buttonContainer: {
    marginTop: 5,
    width: '60%',
    padding: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#DDD',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  column: {
    height: '50%',
    justifyContent: 'flex-start',
  },
  columnHeader: {
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 25,
  },
  qrColumn: {
    flexDirection: 'row',
    alignItems: 'center', 
    padding: 10,
  },
  clickableImage: {
    marginTop: 5,
    width: 30,
    height: 30,
    borderRadius: 25, 
  },
  thumbnailContainer: {
    marginRight: 20, 
  },
  thumbnail: {
    width: 100,
    height: 100,
  },
});

export default ProfileScreen;
