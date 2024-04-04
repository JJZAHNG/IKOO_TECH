import React, { useState, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Animated,
  PanResponder,
  StyleSheet,
  Modal,
  Button,
  FlatList,
} from 'react-native';

const RemoteSimulator = () => {
  const leftJoystickOffset = useRef(new Animated.ValueXY()).current;
  const rightJoystickOffset = useRef(new Animated.ValueXY()).current;

  const [isBluetoothModalVisible, setBluetoothModalVisible] = useState(false);
  const [bluetoothDevices, setBluetoothDevices] = useState([]);

  const createPanResponder = (joystickOffset) => {
    // ...摇杆的PanResponder配置
  };

  const leftJoystickPanResponder = createPanResponder(leftJoystickOffset);
  const rightJoystickPanResponder = createPanResponder(rightJoystickOffset);

  const handleBluetoothPress = () => {
    console.log('蓝牙按钮 pressed');
    // 模拟搜索蓝牙设备
    // TODO: 替换为真正的蓝牙搜索代码
    const fakeDevices = [
      { id: 'device1', name: '设备1' },
      { id: 'device2', name: '设备2' },
      // 添加更多设备...
    ];
    setBluetoothDevices(fakeDevices);
    setBluetoothModalVisible(true);
  };

  const renderBluetoothModal = () => (
    <Modal
      visible={isBluetoothModalVisible}
      onRequestClose={() => setBluetoothModalVisible(false)}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalView}>
        <Text>可用的蓝牙设备:</Text>
        <FlatList
          data={bluetoothDevices}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Text>{item.name}</Text>}
        />
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
        <Text style={styles.buttonText}>蓝牙</Text>
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
  // ...原有的样式保持不变
  buttonText: {
    color: 'white', // 假设您希望按钮文字是白色的
  },
  // 其他需要的样式...
});

export default RemoteSimulator;
