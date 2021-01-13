import React from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';

function AvoidKeyboard({ children, behavior = 'position' }) {
    return (
        <KeyboardAvoidingView
            behavior={ behavior }
            keyboardVerticalOffset={ Platform.OS === 'ios' ? 0 : 0 }
        >
            { children }
        </KeyboardAvoidingView>
    );
}

export default AvoidKeyboard;