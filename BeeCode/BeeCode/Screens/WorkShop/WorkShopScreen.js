// WorkShopScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ImageBackground, SafeAreaView} from 'react-native';

const WorkShopScreen = ({ navigation }) => {
  const backgroundImg = require('./res/background.jpg');
  const operateImg = require('./res/operate.jpg');
  const codeImg = require('./res/code.jpg');
  const exampleImg = require('./res/example.jpg');
  const arrowBackImg = require('./res/arrow_back.jpg');



  return (
    <ImageBackground source={backgroundImg} style={{flex: 1}}>
      <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={arrowBackImg}
              style={{ height: 30, width: 30, marginHorizontal: 10 }}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>机械工坊</Text>
        </View>
      <SafeAreaView style={styles.container}>
        <View style={styles.rowContainer}>
          <TouchableOpacity  onPress={() => navigation.navigate('RemoteSimulator')}>
            <Image source={operateImg} style={styles.imageBox} />
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => navigation.navigate('ScratchScreen')}>
            <Image source={codeImg} style={styles.imageBox} />
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => {/* Navigate to Examples */}}>
            <Image source={exampleImg} style={styles.imageBox} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  imageBox: {
    width: 150,
    height: 187.3,
    margin: 30,
    alignSelf: 'center',
  }
});

export default WorkShopScreen;
