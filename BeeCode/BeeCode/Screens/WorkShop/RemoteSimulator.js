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
    setModalVisible(true); // open the modal when starting scan
    BleManager.scan([], 5, true)
      .then(() => {
        console.log('Scanning...');
        setDevices([]);
      })
      .catch((error) => {
        console.error('Scan error', error);
        setModalVisible(false)
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
    // Updated handleDiscoverPeripheral function to filter devices with a name
    const handleDiscoverPeripheral = (peripheral) => {
      console.log('Discovered new BLE peripheral', peripheral);
      // Only add the peripheral if it has a non-null name
      if (peripheral.name) {
        setDevices((prevDevices) => {
          const deviceIds = prevDevices.map((device) => device.id);
          if (!deviceIds.includes(peripheral.id)) {
            return [...prevDevices, peripheral];
          }
          return prevDevices;
        });
      }
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

  return (
    <ImageBackground source={require('./res/remote_background.jpg')} style={styles.background}>
      <View style={styles.container}>
        {/* First container with a circle */}
        <View style={styles.sideContainer}>
          <View style={styles.circleButton}></View>
        </View>

        {/* Middle container with the Bluetooth connection button */}
        <View style={styles.centerContainer}>
          <TouchableOpacity style={styles.circleButton} onPress={scanDevices}>
            <Text>Connect Bluetooth</Text>
          </TouchableOpacity>
        </View>

        {/* Third container, similar to the first */}
        <View style={styles.sideContainer}>
          <View style={styles.circleButton}></View>
        </View>
      </View>

      {/* Modal to display the list of devices */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <FlatList
            data={devices}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.deviceContainer}>
                <Text style={styles.deviceText}>{item.name}</Text>
              </View>
            )}
          />
          <TouchableOpacity
            style={styles.circleButton}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
