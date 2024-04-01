import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 70,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      },
      inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 30,
        marginBottom: 10,
        paddingRight: 10,
        paddingLeft: 10,
        width: '100%',
      },
      input: {
        flex: 1,
        paddingVertical: 15,
        paddingLeft: 15,
        paddingRight: 90,
        borderRadius: 30,
      },
      button: {
        position: 'absolute',
        right: 10,
        backgroundColor: 'blue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
      },
      buttonText: {
        color: 'white',
      },
    
})