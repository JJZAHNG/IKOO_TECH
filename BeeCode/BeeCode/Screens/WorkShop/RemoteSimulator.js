import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Text, Animated, PanResponder, StyleSheet } from 'react-native';

const RemoteSimulator = () => {
  // 设置摇杆活动区域的半径
  const joystickRadius = 40;
  const joystickOffset = useRef(new Animated.ValueXY()).current;

  // 功能键动画值
  const [buttonsFade] = useState({
    X: new Animated.Value(1),
    O: new Animated.Value(1),
    Square: new Animated.Value(1),
    Triangle: new Animated.Value(1),
  });

  const animateButtonPressIn = (button) => {
    Animated.spring(buttonsFade[button], {
      toValue: 0.5,
      useNativeDriver: true
    }).start();
  };

  const animateButtonPressOut = (button) => {
    Animated.spring(buttonsFade[button], {
      toValue: 1,
      useNativeDriver: true
    }).start();
  };

  // 模拟功能键的处理函数
  const handleActionButtonPress = (action) => {
    console.log(`${action} pressed`);
    // 这里可以添加更多逻辑
  };

  // 摇杆处理逻辑
  const joystickPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        Animated.spring(joystickOffset, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false
        }).start();
      },
      onPanResponderMove: Animated.event([null, {
        dx: joystickOffset.x, // x轴方向的移动
        dy: joystickOffset.y, // y轴方向的移动
      }], { useNativeDriver: false }),
      onPanResponderRelease: () => {
        Animated.spring(joystickOffset, {
          toValue: { x: 0, y: 0 },
          friction: 5,
          useNativeDriver: false
        }).start();
      }
    })
  ).current;

  return (
    <View style={styles.container}>
      <View style={styles.joystickContainer}>
        <Animated.View
          style={[styles.joystick, { transform: joystickOffset.getTranslateTransform() }]}
          {...joystickPanResponder.panHandlers}
        >
          <View style={styles.joystickPuck} />
        </Animated.View>
      </View>

      <View style={styles.actionButtons}>
        {['X', 'O', 'Square', 'Triangle'].map((action) => (
          <TouchableOpacity
            key={action}
            onPressIn={() => animateButtonPressIn(action)}
            onPressOut={() => animateButtonPressOut(action)}
            onPress={() => handleActionButtonPress(action)}
            style={[styles.actionButton, styles.circleButton]}
          >
            <Animated.Text style={[styles.buttonText, { opacity: buttonsFade[action] }]}>
              {action}
            </Animated.Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.joystickContainer}>
        <Animated.View
          style={[styles.joystick, { transform: joystickOffset.getTranslateTransform() }]}
          {...joystickPanResponder.panHandlers}
        >
          <View style={styles.joystickPuck} />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#fff'
  },
  joystickContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  joystick: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  joystickPuck: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#bbb',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  actionButton: {
    margin: 10,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkgrey',
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
  circleButton: {
    borderRadius: 30,
  },
});

export default RemoteSimulator;
