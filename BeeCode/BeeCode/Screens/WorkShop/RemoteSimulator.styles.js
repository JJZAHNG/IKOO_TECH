import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#fff' // 背景色，可根据需要调整
  },
  joystickContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  joystick: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc'
  },
  joystickPuck: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#bbb'
  },
  directionPad: {
    alignItems: 'center'
  },
  horizontalDirections: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  directionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  actionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'darkgrey',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5
  },
  buttonText: {
    fontSize: 20,
    color: 'white'
  },
  // 其他需要的样式...
});
