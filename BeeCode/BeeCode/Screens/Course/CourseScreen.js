import React, { useState, useEffect} from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Button, ScrollView, Animated, Dimensions, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './CourseScreen.styles';



const CourseScreen = ({ navigation }) => {
    const screenHeight = Dimensions.get('window').height;
    const [selectedButton, setSelectedButton] = useState(1); // Assuming the first button is initially selected

    // Dummy buttons for demonstration. Ideally, this could come from props or state.
    const buttons = [
        { id: 1, title: 'Button 1' },
        { id: 2, title: 'Button 2' },
        { id: 3, title: 'Button 3' },
    ];

    const handleScroll = (event) => {
        const scrollPosition = event.nativeEvent.contentOffset.y;
        const centerPosition = scrollPosition + screenHeight / 2;

        // Logic to determine which button is at the center and thus selected
        const buttonHeight = screenHeight / buttons.length; // Adjust based on your UI
        const selectedButtonIndex = Math.floor(centerPosition / buttonHeight);
        setSelectedButton(buttons[selectedButtonIndex]?.id);
    };

    return (
        <SafeAreaView style={styles.container}>
        <StatusBar hidden={true} />
        <ScrollView
            style={styles.scrollContainer}
            onScroll={handleScroll}
            scrollEventThrottle={16} // Adjust based on your needs for performance
        >
            {buttons.map((button) => (
            <View key={button.id} style={styles.scroolButtonContainer}>
                <Button
                title={button.title}
                onPress={() => console.log(`${button.title} pressed`)}
                color={selectedButton === button.id ? 'blue' : 'gray'} // Highlight the selected button
                />
            </View>
            ))}
        </ScrollView>
        

        <View style={styles.mainButtonsContainer}>
            {['I', 'II', 'III'].map((matrixNumber) => (
            <TouchableOpacity
                key={`Matrix ${matrixNumber}`}
                style={styles.matrixButton}
                onPress={() => handleMatrixPress(matrixNumber)}
            >
                <Text style={styles.matrixButtonText}>{`Matrix ${matrixNumber}`}</Text>
            </TouchableOpacity>
            ))}
        </View>
        </SafeAreaView>
    );
};

export default CourseScreen;