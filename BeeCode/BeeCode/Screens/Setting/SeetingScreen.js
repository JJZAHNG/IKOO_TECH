import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SimplePage = ({navigation}) => {
  const handleButton = async() => {
    // Add your button press functionality here
    
    await AsyncStorage.setItem('isLoggedIn', 'false');
    console.log('Set isLoggedIn to false...');
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Button
        title="Press Me"
        onPress={handleButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // This sets the background color of the page
  },
});

export default SimplePage;
