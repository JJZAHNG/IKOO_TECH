// LoginScreen.styles.js
import { StyleSheet, Dimensions } from 'react-native';

// 获取屏幕宽高
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', // 横向排列
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: width * 0.5, // 左侧图片容器占据屏幕宽度的一半
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eaeaea', // 示例背景色，可根据实际情况修改
  },
  inputContainer: {
    width: width * 0.5, // 右侧输入容器也占据屏幕宽度的一半
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // 示例背景色，可根据实际情况修改
  },
  input: {
    width: '80%',
    padding: 10,
    marginVertical: 10, // 为输入框添加上下边距
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  button: {
    width: '80%',
    padding: 15,
    backgroundColor: '#0066ff', // 按钮颜色，可根据实际情况修改
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
