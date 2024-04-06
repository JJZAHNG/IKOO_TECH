import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  
  viewEmpty: {
    width: '40%',
  },

  viewTextinputContainer: {
    width: '60%',
  },

  passwordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },

  passwordInput: {
    flex: 0.75,
  },

  smsButton: {
    flex: 0.25,
    backgroundColor: '#fcd217',
    height: 60, 
    borderRadius: 25, 
    margin: 12,
    elevation: 8,
    paddingVertical: 14,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },

  smsButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: 'bold',
    textAlign: "center",
  },

  signInText: {
    marginTop: 20,
    color: '#841584',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 10,
  },

  button: {
    height: 60,
    borderRadius: 25,
    margin: 12,
    elevation: 8,
    paddingVertical: 14,
    paddingHorizontal: 12,
  },

  button_login: {
    backgroundColor: '#77dd77',
  },

  button_register: {
    backgroundColor: '#fcd217',
  },

  buttonText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
  },

  // Add a new style for the development button
  button_development: {
    marginTop: 10, // You can adjust this value as needed
    backgroundColor: 'green', // Choose a color that distinguishes it from other buttons
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  tabContainer: {
    width: '60%',
    flexDirection: 'row',
    marginBottom: 10,
    height: '10%',
    justifyContent: 'space-evenly'
  },

  tabEmpty: {
    height: '23%'
  },
  
  tab: {
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'lightgrey',
    borderRadius: 10,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '800',
  },
  contentContainer: {
    width: '100%',
    height: '50%',
    alignItems: 'center',
  },

  input: {
    width: '60%',
    marginVertical: 8,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  
    // Elevation for Android
    elevation: 5,
  },
  loginButton: {
    marginTop: 10,
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
  buttonText: {
    color: 'black',
    fontWeight: '800',
    fontSize: 16,
  },

  optionContainer: {
    flexDirection: 'row', // Aligns buttons horizontally
    justifyContent: 'space-evenly', // Evenly space the buttons within the container
    alignItems: 'center', // Center the buttons vertically
    height: '15%', // Adjust based on your design needs
    width: '60%',
  },
  buttonImage: {
    width: 50, 
    height: 50, 
    borderRadius: 25,
  },
})