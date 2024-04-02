// WorkShopScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const WorkShopScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('RemoteSimulator')}>
        <Text style={styles.boxText}>遥控</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.box} onPress={() => {/* Navigate to Programming */}}>
        <Text style={styles.boxText}>编程</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.box} onPress={() => {/* Navigate to Examples */}}>
        <Text style={styles.boxText}>实例</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007bff',
    borderRadius: 10,
    margin: 10,
  },
  boxText: {
    color: 'white',
    fontSize: 18,
  },
});

export default WorkShopScreen;
