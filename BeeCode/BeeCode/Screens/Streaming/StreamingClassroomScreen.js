// StreamingClassroomScreen.js

import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Video from 'react-native-video';

const StreamingClassroomScreen = () => {
  const [paused, setPaused] = useState(true); // 控制播放和暂停
  const videoPlayerRef = useRef(null);

  // 此处添加你的直播流URL
  const streamUrl = 'http://devimages.apple.com.edgekey.net/streaming/examples/bipbop_4x3/gear2/prog_index.m3u8';

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
    backgroundColor: '#000', // 一个深色背景可以使视频更加突出
  },
  video: {
    width: '90%', // 视频宽度占屏幕宽度的90%
    aspectRatio: 16 / 9, // 设置一个通用的宽高比例，例如16:9
  },
  button: {
    position: 'absolute', // 按钮位置绝对定位
    bottom: 30, // 距离底部30单位
    backgroundColor: '#1c90f3', // 按钮颜色
    padding: 15,
    borderRadius: 25,
    alignSelf: 'center', // 确保自我对齐在中心，即使容器样式发生变化
    elevation: 2, // 在安卓上添加一些阴影效果
    shadowColor: '#000', // iOS的阴影颜色
    shadowOffset: { width: 0, height: 2 }, // iOS的阴影偏移
    shadowOpacity: 0.25, // iOS的阴影不透明度
    shadowRadius: 3.84, // iOS的阴影半径
  },
  buttonText: {
    color: '#ffffff', // 按钮文本颜色为白色
    fontSize: 18, // 按钮文本字体大小
    fontWeight: 'bold', // 文本字体加粗
  },
});