import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;
const textSize = screenWidth > 750 ? 20 : 16; 
console.log('Screen Width: ', screenWidth);

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
 
  rightContainer: {
    position: 'absolute', // Position the container absolutely within its parent
    right: 0, // Anchor to the right edge of the screen
    bottom: 0, // Anchor to the bottom edge of the screen
    width: '78%', // Take up 75% of the screen's width
    height: '85%', // Take up 70% of the screen's height
    flexDirection: 'row',
    padding: 20,
    marginRight: 10,
  },
  AccountButtonContainer: {
    position: 'absolute', 
    top: 10, 
    left: 10 
  },
  AccountButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fcbf49', // 按钮颜色
    justifyContent: 'center',
    alignItems: 'center',
  },
  AccountButtonText: {
    color: '#fff', 
    // fontSize: 16
    fontSize: textSize - 4, 

  },
  columnA: {
    width: '35%',
    marginRight: 10, // Add space between the columns
  },
  buttonColumns: {
    flexDirection: 'row',
    flex: 1,
  },
  buttonColumn: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 5, // Adjust spacing as needed
  },
  button: {
    alignItems: 'flex-cen',
    justifyContent: 'flex-start',
    borderRadius: 30,
    marginBottom: 10,
    flex: 1,
    overflow: 'hidden',

    // Shadow Settings
    elevation: 4, // Shadow for Android
    shadowColor: '#000', // Shadow properties are for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  buttonText_normal_bold: {
    //fontSize: 20, 
    fontSize: textSize, 

    fontWeight: '900',
    color: '#fff',
    paddingLeft: 15,
    paddingTop: 15,
  },

  buttonText_big_bold: {
    // fontSize: 26,
    fontSize: textSize + 6, 

    fontWeight: '900',
    color: '#fff',
    paddingLeft: 15,
    paddingTop: 15,
  },

  buttonText_small_light: {
    // fontSize: 12,
    fontSize: textSize - 8, 
    fontWeight: '600',
    color: '#fff',
    paddingLeft: 15,
  },

  buttonA: {
    backgroundColor: 'lightgrey',
  },
  buttonB: {
    backgroundColor: 'lightgrey',
  },
  buttonC: {
    backgroundColor: 'lightgrey',
  },
  buttonD: {
    backgroundColor: 'lightgrey',
  },
  buttonE: {
    backgroundColor: 'lightgrey',
  },
  buttonF: {
    backgroundColor: 'lightgrey',
  },
  buttonG: {
    backgroundColor: 'lightgrey',
  },
  buttonImage: {
    flex: 1,
    width: '100%', // Ensure the image covers the button width
    height: '100%', 
  },
});