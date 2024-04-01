import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },

  passwordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },

  input: {
    height: 60,
    borderRadius: 25,
    margin: 12,
    borderWidth: 1.5,
    paddingVertical: 10,
    paddingStart: 20,
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
})