import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row', // Horizontal layout for two main sections
        backgroundColor: '#f0f0f0', // Background color for the entire view
    },

    scrollContainer: {
        width: '30%', 
        height: '100%',
    },
    
    scroolButtonContainer: {
        height: 100, // Set a fixed height for each button container to ensure they can be scrolled through
        justifyContent: 'center',
        alignItems: 'center',
    },

    mainButtonsContainer: {
        width: '75%',
        flexDirection: 'row', // Align buttons in a row
        justifyContent: 'space-evenly', // Evenly distribute space among buttons
        alignItems: 'center', // Vertically center the buttons
        padding: 10,
    },

    matrixButton: {
        backgroundColor: '#77dd77',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: '60%', // You can adjust the height
        flex: 1, // Each button will take 1/3 of the space
        marginHorizontal: 10, // Add some space between the buttons
        // Add shadows as desired
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },

    matrixButtonText: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10, // Space above the icon
    },

    matrixButtonIcon: {
    // Icon styling could go here
    },
})