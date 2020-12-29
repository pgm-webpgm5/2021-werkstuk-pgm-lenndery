import React from 'react';
import { View } from 'react-native';
import { useKeyboardHeight } from '../hooks';

function AvoidKeyboard({ children }) {
   
    return (
        <View style={{  }}>
            { children }
        </View>
    );
}

export default AvoidKeyboard;