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
    flexDirection: 'column', // 竖直排列
    alignItems: 'flex-start', // 靠左对齐
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
    marginBottom: 10, // 按钮间距
    paddingVertical: 10, // 按钮的垂直填充
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

  mainLargeButtonsContainer: {
    flexDirection: 'row', // 横向排列
    justifyContent: 'space-around', // 每个按钮之间平均分布空间
    alignItems: 'flex-start', // 按钮顶部对齐
    // 设置距离顶部的边距，以便与第一个竖直按钮对齐
    // 你可能需要根据竖直按钮的具体高度调整这个值
    paddingTop: 20, 
  },
  largeButtonsContainer: {
    flexDirection: 'column', // 竖直排列
    justifyContent: 'space-between', // 均匀分布
    // 设置宽度为剩余空间的一部分
    width: screenWidth - (screenWidth * 0.28 + 20),
    paddingVertical: 10, // 垂直填充
    paddingLeft: 10, // 与左侧的小按钮有间隔
  },
  largeButton: {
    // 修改为横向排列的样式
    flexDirection: 'row', // 新增行方向布局
    width: screenWidth - (screenWidth * 0.28 + 40), // 减去左边按钮的宽度和一些间距
    height: screenHeight * 0.18, // 高度与小按钮相同
    backgroundColor: '#34A853', // 背景颜色
    marginBottom: 10, // 保持与小按钮相同的底部边距
    justifyContent: 'center', // 内容水平居中
    alignItems: 'center', // 内容垂直居中
    borderRadius: 5, // 圆角
    overflow: 'hidden', // 防止子视图超出边界
    paddingHorizontal: 10, // 水平填充
    overflow: 'hidden', // 防止子视图（如图像）超出按钮边界
  },
  largeButtonImage: {
    position: 'absolute', // 使用绝对定位
    top: 0, // 顶部对齐
    left: 0, // 左边对齐
    width: '100%', // 宽度填满按钮
    height: '100%', // 高度填满按钮
  },
  largeButtonText: {
    // 文字在图片之上
    zIndex: 1, // 确保文本在图像之上
    color: '#ffffff',
    fontSize: 18,
  },

  // 新增的包装容器样式
  buttonWrapper: {
    flexDirection: 'row', // 子容器横向排列
    alignItems: 'flex-start', // 子容器顶部对齐
    justifyContent: 'flex-start', // 子容器左边对齐
  },
});
