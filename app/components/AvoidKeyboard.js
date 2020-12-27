import React from 'react';
import { View } from 'react-native';
import { useKeyboardHeight } from '../hooks';

function AvoidKeyboard({ children }) {
    const { maxHeight } = useKeyboardHeight()
    
    return (
        <View style={{  }}>
            { children }
        </View>
    );
}

export default AvoidKeyboard;