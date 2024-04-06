import { StyleSheet, Dimensions } from "react-native";

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', // 整个视图的背景色
  },
  scrollContainer: {
    backgroundColor: '#fff', // 滚动视图的背景色
    paddingHorizontal: 10, // 滚动视图内部的水平填充
    paddingVertical: 20, // 滚动视图内部的垂直填充
  },
  button: {
    marginBottom: 10, // 按钮之间的间距
    paddingVertical: 10, // 按钮的垂直填充
    backgroundColor: 'blue', // 按钮的背景色
    borderRadius: 5, // 按钮的圆角
    justifyContent: 'center', // 垂直居中对齐
    alignItems: 'center', // 水平居中对齐
  },
  buttonText: {
    color: 'white', // 按钮文字颜色
    fontSize: 16, // 按钮文字大小
  },
  mainButtonsContainer: {
    flex: 1,
    flexDirection: 'row', // 主按钮水平排列
    justifyContent: 'space-around', // 按钮之间平均分布空间
    alignItems: 'center', // 垂直居中
    paddingHorizontal: 10, // 主按钮容器的水平填充
    paddingVertical: 20, // 主按钮容器的垂直填充
  },
  matrixButton: {
    width: screenWidth * 0.28, // 方块宽度为屏幕宽度的28%
    height: screenHeight * 0.18, // 方块高度为屏幕高度的18%
    backgroundColor: '#77dd77', // 方块的背景色
    borderRadius: 10, // 方块的圆角
    justifyContent: 'center', // 内容垂直居中
    alignItems: 'center', // 内容水平居中
    elevation: 3, // 阴影
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  matrixButtonText: {
    color: 'white', // 方块文字颜色
    fontWeight: 'bold', // 方块文字粗细
    fontSize: 16, // 方块文字大小
  },
  // 如果有图标，可以在此处添加图标样式
  matrixButtonIcon: {
    // 图标样式
  },
});
