import { View, Text, Pressable, StyleSheet } from 'react-native'

import Colors from '../../constants/color';

function PrimaryButton({ children, onPress }) {

    return (
        // The style below can take a prop or it can take a function. We make it take a function for this case to make it pressable
        // on iOS. There is a keyword 'pressed' property. 'pressed' is a boolean which is true or false.
        <View style={styles.buttonOuterContainer}>
            <Pressable style={({ pressed }) =>
                pressed
                    ? [styles.pressed, styles.buttonInnerContainer]
                    : styles.buttonInnerContainer
            }
                onPress={onPress}
                android_ripple={{ color: Colors.primary600 }}>
                <Text style={styles.buttonText}>{children}</Text>
            </Pressable>
        </View>
    )
}

export default PrimaryButton;

const styles = StyleSheet.create({
    buttonOuterContainer: {
        borderRadius: 28,
        margin: 4,
        overflow: 'hidden',
    },
    buttonInnerContainer: {
        backgroundColor: Colors.primary500,
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 2,

    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    pressed: { // THIS PART FOR ONLY iOS
        opacity: 0.75
    }
})