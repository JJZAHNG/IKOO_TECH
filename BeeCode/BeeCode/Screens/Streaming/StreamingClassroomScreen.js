import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Video from 'react-native-video';
import React, { useState, useRef } from 'react';


const StreamingClassroomScreen = () => {
  const [paused, setPaused] = useState(true); // 控制播放和暂停
  const videoPlayerRef = useRef(null);

  // 此处添加你的直播流URL
  const streamUrl = 'http://devimages.apple.com.edgekey.net/streaming/examples/bipbop_4x3/gear2/prog_index.m3u8';

  // 定义一些空函数来替代未定义的函数
  const handleLoadStart = () => {};
  const handleLoad = () => {};
  const handleBuffer = () => {};
  const handleVideoError = () => {};

  return (
    <View style={styles.container}>
      <Video
        ref={videoPlayerRef}
        source={{ uri: streamUrl }}
        style={styles.video}
        paused={paused}
        resizeMode="contain" // 这个属性保证视频内容都是可见的，没有被剪切或拉伸
        onLoadStart={handleLoadStart} // 可选，用于处理视频开始加载时的逻辑
        onLoad={handleLoad} // 可选，用于处理视频加载完成时的逻辑
        onBuffer={handleBuffer} // 可选，用于处理视频缓冲时的逻辑
        onError={handleVideoError} // 可选，用于处理视频出错时的逻辑
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => setPaused(!paused)}>
        <Text style={styles.buttonText}>{paused ? '播放' : '暂停'}</Text>
      </TouchableOpacity>
    </View> 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // A dark background to make the video stand out
  },
  video: {
    width: '90%', // The video width occupies 90% of the screen width
    aspectRatio: 16 / 9, // Set a common aspect ratio, such as 16:9
  },
  button: {
    position: 'absolute', // The button position is absolutely positioned
    bottom: 30, // 30 units from the bottom
    backgroundColor: '#1c90f3', // Button color
    padding: 15,
    borderRadius: 25,
    alignSelf: 'center', // Ensure self-alignment in the center, even if the container style changes
    elevation: 2, // Add some shadow effect on Android
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
    shadowOpacity: 0.25, // Shadow opacity for iOS
    shadowRadius: 3.84, // Shadow radius for iOS
  },
  buttonText: {
    color: '#ffffff', // Button text color is white
    fontSize: 18, // Button text font size
    fontWeight: 'bold', // Bold text font
  },
});

export default StreamingClassroomScreen;