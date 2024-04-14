import React, { useState, useEffect } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import { View, Modal, Text, FlatList, TouchableOpacity, StyleSheet, ImageBackground, Image, Animated, PanResponder, Dimensions } from 'react-native';
import BleManager from 'react-native-ble-manager';
import { Alert } from 'react-native';



const Joystick = ({ size }) => {
  const [stickPosition, setStickPosition] = useState(new Animated.ValueXY());

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      stickPosition.setOffset({
        x: stickPosition.x._value,
        y: stickPosition.y._value,
      });
    },
    onPanResponderMove: Animated.event([
      null,
      {
        dx: stickPosition.x,
        dy: stickPosition.y,
      },
    ], { useNativeDriver: false }),
    onPanResponderRelease: () => {
      stickPosition.flattenOffset();
      Animated.spring(stickPosition, {
        toValue: { x: 0, y: 0 },
        friction: 5,
        useNativeDriver: false,
      }).start();
    },
  });

  const joystickSize = size / 2;
  const stickStyle = {
    ...styles.joystickStick,
    transform: stickPosition.getTranslateTransform(),
    width: joystickSize,
    height: joystickSize,
    borderRadius: joystickSize / 2,
  };

  return (
    <View
      style={[
        styles.joystickContainer,
        { width: size, height: size, borderRadius: size / 2 },
      ]}
    >
      <Animated.View
        {...panResponder.panHandlers}
        style={stickStyle}
      />
    </View>
  );
};


const RemoteSimulator = ({ navigation }) => {
  const arrowBackImg = require('./res/arrow_back.jpg');

  const leftButtons = {
    top: require('./res/leftButtons/top.jpg'),
    right: require('./res/leftButtons/right.jpg'),
    bottom: require('./res/leftButtons/bottom.jpg'),
    left: require('./res/leftButtons/left.jpg'),
  };

  const rightButtons = {
    top: require('./res/rightButtons/top.jpg'),
    right: require('./res/rightButtons/right.jpg'),
    bottom: require('./res/rightButtons/bottom.jpg'),
    left: require('./res/rightButtons/left.jpg'),
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [devices, setDevices] = useState([]);

  const [connectedDeviceId, setConnectedDeviceId] = useState(null);
  const [serviceUUID, setServiceUUID] = useState(null);
  const [characteristicUUID, setCharacteristicUUID] = useState(null);

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

  // 尝试连接到选中的设备
  const handleDevicePress = (device) => {
    // 关闭设备列表弹窗
    setModalVisible(false);
    
    // 开始连接过程
    BleManager.connect(device.id)
      .then(() => {
        console.log('Connected to ' + device.name);
        // 连接成功后的操作...
        // 可能需要进一步检索服务和特征
        // BleManager.retrieveServices(device.id).then((peripheralInfo) => {
        //   console.log('Peripheral info:', peripheralInfo);
        // });
        return BleManager.retrieveServices(device.id);
      })
      .then((peripheralInfo) => {
        console.log('Peripheral info', peripheralInfo);
        // 在这里，你可以根据需要处理服务和特征
        // 例如，你可以根据特定的服务UUID和特征UUID来读取或写入数据
        const firstService = peripheralInfo.services[0];
        const firstCharacteristic = firstService.characteristics[0];
        setServiceUUID(firstService.uuid);
        setCharacteristicUUID(firstCharacteristic.uuid);
      })
      .catch((error) => {
        console.error('Connection error', error);
      });
  };

  // 添加读取数据的函数
  const readData = () => {
    if (connectedDeviceId && serviceUUID && characteristicUUID) {
      BleManager.read(connectedDeviceId, serviceUUID, characteristicUUID)
        .then((readData) => {
          console.log('Read data:', readData);
          // 处理读取到的数据
        })
        .catch((error) => {
          console.error('Read error', error);
        });
    } else {
      console.log('Device is not connected or UUIDs are not set');
    }
  };

  // 添加写入数据的函数
  const writeData = (data) => {
    if (connectedDeviceId && serviceUUID && characteristicUUID) {
      BleManager.write(connectedDeviceId, serviceUUID, characteristicUUID, data)
        .then(() => {
          console.log('Write success');
        })
        .catch((error) => {
          console.error('Write error', error);
        });
    } else {
      console.log('Device is not connected or UUIDs are not set');
    }
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

  const LeftButtons = ({ onButtonPress }) => {
    return (
      <View style={styles.container_leftButton}>
        <TouchableOpacity style={[styles.button_leftButton, styles.topButton_leftButton]} onPress={() => onButtonPress('top')}>
          <Image source={leftButtons.top} style={styles.buttonImage_leftButton} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button_leftButton, styles.rightButton_leftButton]} onPress={() => onButtonPress('right')}>
          <Image source={leftButtons.right} style={styles.buttonImage_leftButton} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button_leftButton, styles.bottomButton_leftButton]} onPress={() => onButtonPress('bottom')}>
          <Image source={leftButtons.bottom} style={styles.buttonImage_leftButton} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button_leftButton, styles.leftButton_leftButton]} onPress={() => onButtonPress('left')}>
          <Image source={leftButtons.left} style={styles.buttonImage_leftButton} />
        </TouchableOpacity>
      </View>
    );
  };

  const RightButtons = ({ onButtonPress }) => {
    return (
      <View style={styles.container_leftButton}>
        <TouchableOpacity style={[styles.button_leftButton, styles.topButton_leftButton]} onPress={() => onButtonPress('top')}>
          <Image source={rightButtons.top} style={styles.buttonImage_leftButton} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button_leftButton, styles.rightButton_leftButton]} onPress={() => onButtonPress('right')}>
          <Image source={rightButtons.right} style={styles.buttonImage_leftButton} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button_leftButton, styles.bottomButton_leftButton]} onPress={() => onButtonPress('bottom')}>
          <Image source={rightButtons.bottom} style={styles.buttonImage_leftButton} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button_leftButton, styles.leftButton_leftButton]} onPress={() => onButtonPress('left')}>
          <Image source={rightButtons.left} style={styles.buttonImage_leftButton} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ImageBackground source={require('./res/remote_background.jpg')} style={styles.background}>
      <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={arrowBackImg}
              style={{ height: 30, width: 30, marginHorizontal: 10 }}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>机械工坊</Text>
        </View>
      <View style={styles.container}>
        {/* First container with a circle */}
        <View style={styles.sideContainer}>
          {/* <View style={styles.circleButton}></View> */}
          <LeftButtons onButtonPress={(direction) => {
            console.log(`Left Button pressed: ${direction}`);
            // Handle the button press here
          }} />
        </View>

        {/* Middle container with the Bluetooth connection button */}
        <View style={styles.centerContainer}>
          <TouchableOpacity style={styles.circleButton} onPress={scanDevices}>
            <Text>Connect Bluetooth</Text>
          </TouchableOpacity>
        </View>

        {/* Third container, similar to the first */}
        <View style={styles.sideContainer}>
          {/* <View style={styles.circleButton}></View> */}
          <RightButtons onButtonPress={(direction) => {
            console.log(`Right Button pressed: ${direction}`);
            // Handle the button press here
          }} />
        </View>
        
      </View>
      <View style={styles.joysticksColumn}>
          <Joystick size={120} />
          <Joystick size={120} />
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
              <TouchableOpacity
                style={styles.deviceContainer}
                onPress={() => handleDevicePress(item)} // 添加此行代码
              >
                <Text style={styles.deviceText}>{item.name}</Text>
              </TouchableOpacity>
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

const buttonSize = 60; // Size of the touchable area for each button
const screenWidth = Dimensions.get('window').width;
const joystickSize = 120;



  
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',  // Aligns the back button and title horizontally
    alignItems: 'center',
    justifyContent: 'space-between',  // Positions the back button on the left and centers the title
    paddingHorizontal: 10,
    height: 60,  // Fixed height for the header
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',  // Ensures the title is centered within the available space
    fontSize: 20,
    fontWeight: '900',
    color: 'white'
  },
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

  container_leftButton: {
    width: buttonSize * 3,
    height: buttonSize * 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button_leftButton: {
    position: 'absolute',
    width: buttonSize,
    height: buttonSize,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonImage_leftButton: {
    width: buttonSize,
    height: buttonSize,
  },
  topButton_leftButton: {
    top: 0,
    left: buttonSize,
  },
  rightButton_leftButton: {
    top: buttonSize,
    left: buttonSize * 2,
  },
  bottomButton_leftButton: {
    top: buttonSize * 2,
    left: buttonSize,
  },
  leftButton_leftButton: {
    top: buttonSize,
    left: 0,
  },
  joystickContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CCC',
    opacity: 0.5,
  },
  joystickStick: {
    backgroundColor: 'blue',
    position: 'absolute',
  },
  joysticksColumn: {
    flexDirection: 'row',
    position: 'absolute',
    left: screenWidth / 3 - joystickSize / 2,
    bottom: 50, 
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60, 
    width: '50%',
    alignSelf: 'center',
  },
});


export default RemoteSimulator;
