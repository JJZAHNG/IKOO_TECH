import React, { useState, useEffect, useRef } from 'react';
import { Platform, View, TouchableOpacity, Text, Animated, PanResponder, StyleSheet, Modal, Button, FlatList, PermissionsAndroid, Alert } from 'react-native';
import BluetoothClassic from 'react-native-bluetooth-classic';

const RemoteSimulator = () => {
  const leftJoystickOffset = useRef(new Animated.ValueXY()).current;
  const rightJoystickOffset = useRef(new Animated.ValueXY()).current;
  const [isBluetoothModalVisible, setBluetoothModalVisible] = useState(false);
  const [bluetoothDevices, setBluetoothDevices] = useState([]);
  const createPanResponder = (joystickOffset) => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {
        dx: joystickOffset.x,
        dy: joystickOffset.y,
      }], { useNativeDriver: false }),
      onPanResponderRelease: () => {
        Animated.spring(joystickOffset, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false
        }).start();
      }
    });
  };

  useEffect(() => {
    const requestBluetoothPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Bluetooth Permission",
            message: "This app needs access to your location to use Bluetooth",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Bluetooth permission granted");
        } else {
          console.log("Bluetooth permission denied");
          Alert.alert("Bluetooth permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
    };

    requestBluetoothPermission();
    
    // 添加设备发现监听器
    const discoveryListener = BluetoothClassic.onDeviceDiscovered(event => {
      console.log(`A new device was discovered: ${event.device}`);
      setBluetoothDevices(prevDevices => [...prevDevices, event.device]);
    });

    // 清除监听器，当组件卸载时执行
    return () => {
      discoveryListener.remove();
    };
  }, []);


    const searchForDevices = async () => {
    try {
      const isEnabled = await BluetoothClassic.isBluetoothEnabled();
      if (!isEnabled) {
        Alert.alert('Bluetooth is not enabled', 'Please enable Bluetooth and try again.');
        // 可以选择直接打开蓝牙设置，让用户手动打开
        BluetoothClassic.openBluetoothSettings();
      } else {
        // Bluetooth is enabled, start discovery
        await BluetoothClassic.startDiscovery();
        // 这里不需要设置bluetoothDevices，因为设备发现事件会更新它
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'There was an error starting discovery.');
    }
  };
  const leftJoystickPanResponder = useRef(createPanResponder(leftJoystickOffset)).current;
  const rightJoystickPanResponder = useRef(createPanResponder(rightJoystickOffset)).current;

  // 模拟蓝牙设备搜索和连接
  const handleBluetoothPress = () => {
    console.log('蓝牙按钮 pressed');
    searchForDevices();
    setBluetoothModalVisible(true);
  };

  // 渲染蓝牙设备模态
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
