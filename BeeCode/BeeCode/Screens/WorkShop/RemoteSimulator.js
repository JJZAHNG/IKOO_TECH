import React, { useState, useEffect } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import { View, Modal, Text, FlatList, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import BleManager from 'react-native-ble-manager';

const RemoteSimulator = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [devices, setDevices] = useState([]);

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
    requestLocationPermission();
    BleManager.start({ showAlert: false });

    const handleDiscoverPeripheral = (peripheral) => {
      console.log('Discovered new BLE peripheral', peripheral);
      if (!peripheral.name) {
        peripheral.name = 'UNKNOWN';
      }
      setDevices((devices) => {
        const deviceIds = devices.map((device) => device.id);
        if (!deviceIds.includes(peripheral.id)) {
          return [...devices, peripheral];
        }
        return devices;
      });
    };

    const scanDevices = () => {
      BleManager.scan([], 5, true).then(() => {
        console.log('Scanning...');
        setDevices([]);
      }).catch((error) => {
        console.error('Scan error', error);
      });
    };

    const discoverListener = BleManager.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);

    // 扫描设备
    scanDevices();

    return () => {
      discoverListener.remove();
    };
  }, []);

  // 点击按钮，开始扫描设备
  const handleScanButtonPress = () => {
    setModalVisible(true);
    scanDevices();
  };

  // 连接到设备
  const connectToDevice = (device) => {
    BleManager.connect(device.id)
      .then(() => {
        console.log('Connected to ' + device.name);
        // ... 执行后续操作
      })
      .catch((error) => {
        console.error('Connection error', error);
      });
  };

  return (
    <ImageBackground source={require('./res/remote_background.jpg')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.sideContainer} />
        <View style={styles.centerContainer}>
        {/* 按钮用于触发蓝牙设备扫描 */}
        <TouchableOpacity style={styles.circleButton} onPress={handleScanButtonPress}>
        <Text>Scan Bluetooth</Text>
      </TouchableOpacity>
        </View>
        <View style={styles.sideContainer} />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.modalView}>
            <FlatList
              data={devices}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.deviceContainer} onPress={() => connectToDevice(item)}>
                  <Text style={styles.deviceText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
};

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

export default RemoteSimulator;
