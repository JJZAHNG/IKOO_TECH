import React, { useState, useEffect } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import { View, Modal, Text, FlatList, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import BleManager from 'react-native-ble-manager';
import { Alert } from 'react-native';


const RemoteSimulator = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [devices, setDevices] = useState([]);

  const scanDevices = () => {
    console.log('Starting scan...');
    BleManager.scan([], 5, true)
      .then(() => {
        console.log('Scanning...');
        setDevices([]);
      })
      .catch((error) => {
        console.error('Scan error', error);
      });
  };


  // 请求定位权限，用于蓝牙扫描
  const requestLocationPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission Required',
          message: 'This app needs location permissions to scan for bluetooth devices.',
        },
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Location permission denied');
        return false;
      }
      return true;
    }
    return true;
  };

  useEffect(() => {
    const initializeBleManager = async () => {
      const hasPermission = await requestLocationPermission();
      if (hasPermission) {
        console.log('Location permission granted, initializing BLE manager...');
        BleManager.start({ showAlert: false });
        BleManager.checkState(); // 检查当前的BLE状态
      }
    };
  
    initializeBleManager();
  
    // 添加BLE发现设备事件监听器
    const handleDiscoverPeripheral = (peripheral) => {
      console.log('Discovered new BLE peripheral', peripheral);
      if (!peripheral.name) {
        peripheral.name = 'UNKNOWN';
      }
      setDevices((prevDevices) => {
        const deviceIds = prevDevices.map((device) => device.id);
        if (!deviceIds.includes(peripheral.id)) {
          return [...prevDevices, peripheral];
        }
        return prevDevices;
      });
    };
  
    const discoverListener = BleManager.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
  
    return () => {
      discoverListener.remove();
    };
  }, []);

  useEffect(() => {
    BleManager.start({ showAlert: false });
  
    const handleUpdateState = (args) => {
      console.log('BleManagerDidUpdateState:', args);
      if (args.state === 'off') {
        // The Bluetooth is off, prompt the user to enable it
        Alert.alert(
          'Bluetooth is off',
          'Please turn on Bluetooth to allow the app to connect to devices.',
          [
            // This button option should take the user to their Bluetooth settings
            { text: 'Go to Settings', onPress: () => BleManager.enableBluetooth() },
            { text: 'Cancel', onPress: () => console.log('User canceled Bluetooth enabling'), style: 'cancel' },
          ],
        );
      }
    };
  
    const stateListener = BleManager.addListener('BleManagerDidUpdateState', handleUpdateState);
  
    return () => {
      stateListener.remove();
    };
  }, []);
  
const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  sideContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleButton: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DDD',
    borderRadius: 50,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: '80%',
  },
  deviceContainer: {
    padding: 10,
    marginVertical: 4,
    marginHorizontal: 2,
    borderBottomWidth: 1,
    borderColor: '#CCCCCC',
  },
  deviceText: {
    fontSize: 18,
  },
});
}

export default RemoteSimulator;
