

// ScratchScreen.js
import React from 'react';
import { WebView } from 'react-native-webview';

const ScratchScreen = () => {
  return (
    <WebView
      source={{ uri: 'http://localhost:8602' }} // 替换成你的scratch-gui地址
      style={{ flex: 1 }}
    />
  );
};

export default ScratchScreen;
