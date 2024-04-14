import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;
const textSize = screenWidth > 850 ? 20 : 18; 
console.log('Screen width: ', screenWidth);

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
 
  rightContainer: {
    position: 'absolute', // Position the container absolutely within its parent
    right: 0, // Anchor to the right edge of the screen
    bottom: 0, // Anchor to the bottom edge of the screen
    width: '78%', 
    height: '85%',
    flexDirection: 'row',
    padding: 20,
    marginRight: 10,
  },
  AccountButtonContainer: {
    position: 'absolute', 
    top: 3, 
    left: 13,
    width: 0.15 * screenWidth,
    height: 0.05 * screenWidth,
  },
  AccountButton: {
    width: 0.15 * screenWidth,
    height: 0.05 * screenWidth,
    borderRadius: 25,
    backgroundColor: '#fcbf49', // 按钮颜色
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingStart: 2,
  },
  profileImage: {
    width: 0.045 * screenWidth,
    height: 0.045 * screenWidth,
    borderRadius: 25,
  },
  AccountButtonText: {
    color: '#fff', 
    // fontSize: 16
    fontSize: textSize - 4, 
    paddingStart: 10,

  },

  columnA: {
    width: '30%',
    marginRight: 10, // Add space between the columns
  },
  buttonColumns: {
    flexDirection: 'row',
    flex: 1,
    width: '65%',
  },
  buttonColumn: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 10, // Adjust spacing as needed
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