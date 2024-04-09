// CourseScreen.styles.js

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // 垂直居中
    alignItems: 'center', // 水平居中
    backgroundColor: '#f0f0f0', // 更改背景色
  },
  scrollView: {
    width: '100%', // 确保 ScrollView 占满宽度
  },
  button: {
    // 小按钮的样式
    backgroundColor: '#77dd77',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    // 按钮文本的样式
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // ... 其他需要的样式
});
