

// ScratchScreen.js
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

const ScratchScreen = () => {
  return (
    <WebView
      source={{ uri: 'http://192.168.110.84:8602' }} // 替换成你的scratch-gui地址
      style={{ flex: 1 }}
    />
  );
};

export default ScratchScreen;
