import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get('window'); // Get screen width


export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: 20,
        paddingTop: '12%'
      },
      input: {
        width: width * 0.3, // 30% of screen width
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',

      },
      smsCodeContainer: {
        width: width * 0.3, // 30% of screen width
        flexDirection: 'row',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
      },
      smsInput: {
        flex: 1,
        marginRight: -50, // Adjust based on the button size
      },
      smsButton: {
        position: 'absolute',
        right: 10,
        top: 10,
        bottom: 10,
      },
      confirmPasswordContainer: {
        width: width * 0.33, // 30% of screen width
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
      },
      indicator: {
        marginLeft: 10,
        width: 20,
        height: 20,
        borderRadius: 10,
      },
      match: {
        backgroundColor: 'green',
      },
      noMatch: {
        backgroundColor: 'red',
      },
})