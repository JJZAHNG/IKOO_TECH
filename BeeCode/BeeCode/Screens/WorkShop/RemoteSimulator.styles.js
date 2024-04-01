// RemoteSimulator.styles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  directionPad: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  horizontalDirections: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  directionButton: {
    padding: 10,
    margin: 5,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    padding: 10,
    margin: 5,
    backgroundColor: 'darkgrey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
  joystickContainer: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  joystick: {
    width: 80,
    height: 80,
    borderRadius: 40, // 使其成为圆形
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd', // 轻微灰色背景，可根据设计调整
  },
  joystickPuck: {
    width: 30,
    height: 30,
    borderRadius: 15, // 使其成为圆形
    backgroundColor: '#bbb', // 轻微深色背景，可根据设计调整
  },
  
  // 其他需要的样式...
});
