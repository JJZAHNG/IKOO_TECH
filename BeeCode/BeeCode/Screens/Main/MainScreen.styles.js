import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#f0f0f0',
      },
      leftPlaceholder: {
        width: '25%',
        backgroundColor: '#d3d3d3', // Example placeholder color
      },
      rightContainer: {
        width: '75%',
        flexDirection: 'row',
        padding: 20,
        marginRight: 10,
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
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        borderRadius: 30,
        padding: 15,
        marginBottom: 10,
        flex: 1,
    
        // Shadow Settings
        elevation: 4, // Shadow for Android
        shadowColor: '#000', // Shadow properties are for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      buttonText_normal_bold: {
        fontSize: 20,
        fontWeight: '900',
        color: '#fff',
      },
    
      buttonText_big_bold: {
        fontSize: 26,
        fontWeight: '900',
        color: '#fff',
      },
    
      buttonText_small_light: {
        fontSize: 11,
        fontWeight: '600',
        color: '#fff',
      },
    
      buttonA: {
        backgroundColor: '#77dd77',
        flex: 1, // Take up the full height of the column
        marginBottom: 10, // No margin at the bottom for "A"
      },
      buttonB: {
        backgroundColor: '#ff6961',
      },
      buttonC: {
        backgroundColor: '#fdb147',
      },
      buttonD: {
        backgroundColor: '#ffec61',
      },
      buttonE: {
        backgroundColor: '#a7d129',
      },
      buttonF: {
        backgroundColor: '#29b6f6',
      },
      buttonG: {
        backgroundColor: '#ba68c8',
      },
});