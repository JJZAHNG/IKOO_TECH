import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  
  rowEmpty: {
    width: '40%',
  },

  TextinputContainer: {
    width: '60%',
  },

  columnContainer: {
    width: '60%', 
    flexDirection: 'cloumn', 
    alignItems: 'center'
  },

  columnEmpty: {
    height: '23%'
  },

  textInputContainer: {
    width: '100%',
    height: '30%',
    alignItems: 'center',
  },

  textInput: {
    width: '60%',
    marginVertical: 8,
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    fontSize: 18,

    // Elevation for IOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  
    // Elevation for Android
    elevation: 5,
  },


  loginContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: '20%',
    width: '100%',
    alignItems: 'center',
  },
  
  forgetPasswordContainer: {
    width: '60%',
    alignItems: 'flex-end',
  },

  forgetPasswordText: {
    paddingTop: 5,
    color: 'white',
    fontWeight: '800',
    fontSize: 12,
  }, 

  loginButton: {
    marginTop: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 25,
    width: '60%',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  
    // Elevation for Android
    elevation: 5,
  },

  loginText: {
    color: 'black',
    fontWeight: '800',
    fontSize: 16,
  },

  optionContainer: {
    flexDirection: 'row', // Aligns buttons horizontally
    justifyContent: 'space-evenly', // Evenly space the buttons within the container
    alignItems: 'center', // Center the buttons vertically
    height: '27%', // Adjust based on your design needs
    width: '60%',
  },


  buttonContainer: {
    alignItems: 'center', // Centers items horizontally in the container
    justifyContent: 'center', // Centers items vertically in the container
    width: 80, // Adjust the width as needed
    height: 100, // Adjust the height to fit both image and text
  },

  buttonImage: {
    width: 40, 
    height: 40, 
    borderRadius: 25,
  },
  
  buttonText: {
    marginTop: 4, // Space between the image and text
    fontSize: 10, // Adjust text size as needed
    fontWeight: '700',
    textAlign: 'center', // Ensure text is centered under the image
    color: 'white', // Adjust text color as needed
  },

  inputWithButton: {
    flexDirection: 'row',
    ustifyContent: 'center', 
    alignItems: 'center', // Center children vertically
    borderRadius: 25,
    position: 'relative', // Needed for absolute positioning of the button

  },
  
  
  sendSMSButton: {
    position: 'absolute', // Position button over the container
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: 'rgb(234, 128, 0)',
    borderRadius: 25,
    right: 3,
    height: 38
  },
  
  sendSMSText: {
    color: 'white',
    // Apply additional text styling as needed
  },
})