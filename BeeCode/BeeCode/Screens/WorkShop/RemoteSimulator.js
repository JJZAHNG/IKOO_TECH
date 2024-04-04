import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Text, Animated, PanResponder, StyleSheet, Modal, Button } from 'react-native';

const RemoteSimulator = () => {
  // 创建两个摇杆的动画值
  const leftJoystickOffset = useRef(new Animated.ValueXY()).current;
  const rightJoystickOffset = useRef(new Animated.ValueXY()).current;

  // 蓝牙设备列表和模态视图的状态
  const [bluetoothModalVisible, setBluetoothModalVisible] = useState(false);

  // 摇杆的PanResponder配置
  const createPanResponder = (joystickOffset) => {
    return PanResponder.create({
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
      }], {
        useNativeDriver: false,
        listener: (event, gestureState) => {
          console.log(`Joystick moved: X: ${gestureState.dx}, Y: ${gestureState.dy}`);
        },
      }),
      onPanResponderRelease: () => {
        Animated.spring(joystickOffset, {
          toValue: { x: 0, y: 0 },
          friction: 5,
          useNativeDriver: false
        }).start();
      }
    });
  };

  const leftJoystickPanResponder = createPanResponder(leftJoystickOffset);
  const rightJoystickPanResponder = createPanResponder(rightJoystickOffset);

  // 模拟蓝牙设备搜索和连接
  const handleBluetoothPress = () => {
    console.log('蓝牙按钮 pressed');
    // 此处需要你自己实现具体的蓝牙搜索和连接逻辑
    // 这是假设的代码，真正的实现需要用到特定的蓝牙库
    // getBluetoothDevices().then(devices => {
    //   setBluetoothDevices(devices);
    //   setBluetoothModalVisible(true);
    // });
    setBluetoothModalVisible(true);
  };

  // 渲染蓝牙设备模态
  const renderBluetoothModal = () => (
    <Modal
      visible={bluetoothModalVisible}
      onRequestClose={() => setBluetoothModalVisible(false)}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalView}>
        <Text>可用的蓝牙设备:</Text>
        {/* 设备列表应该通过状态来动态生成 */}
        <Text>设备1</Text>
        <Text>设备2</Text>
        <Button title="关闭" onPress={() => setBluetoothModalVisible(false)} />
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      {renderBluetoothModal()}
      <Animated.View
        style={[styles.joystick, {
          transform: leftJoystickOffset.getTranslateTransform()
        }]}
        {...leftJoystickPanResponder.panHandlers}
      >
        <View style={styles.joystickPuck} />
      </Animated.View>

      <TouchableOpacity onPress={handleBluetoothPress} style={styles.bluetoothButton}>
        <Text>蓝牙</Text>
      </TouchableOpacity>

      <Animated.View
        style={[styles.joystick, {
          transform: rightJoystickOffset.getTranslateTransform()
        }]}
        {...rightJoystickPanResponder.panHandlers}
      >
        <View style={styles.joystickPuck} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
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
  bluetoothButton: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#007bff',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  // 其他需要的样式...
});

export default RemoteSimulator;
