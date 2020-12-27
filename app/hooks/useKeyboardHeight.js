import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { useKeyboard } from '@react-native-community/hooks'
import { vh } from '../utils';

export const useKeyboardHeight = () => {
    const defaultHeight = (vh(100) + StatusBar.currentHeight);
    
    const { keyboardHeight, keyboardShown } = useKeyboard();
    const [ height, setHeight ] = useState(0);
    const [ maxHeight, setMaxHeight ] = useState(defaultHeight);
    
    useEffect(() => {
        keyboardShown ? 
            setHeight(keyboardHeight):
            setHeight(0)
    }, [keyboardShown])
    
    useEffect(() => {
        keyboardShown ? 
            setMaxHeight(defaultHeight - height) : 
            setMaxHeight(defaultHeight)
    }, [height])
    
    return {
        height,
        maxHeight,
        keyboardShown
    }
}