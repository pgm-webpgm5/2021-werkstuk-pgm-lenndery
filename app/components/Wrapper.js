import React from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
import { rem } from '../utils';

function Wrapper({ children, style, x, y }) {
    return (
        <View style={[ 
            styles.wrapper, 
            style,
            x && styles.x,
            y && styles.y,
        ]}>
            { children }
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        padding: rem(2),
        height: '100%',
    },
    x: {
        padding: 0,
        paddingHorizontal: rem(2)
    },
    y: {
        padding: 0,
        paddingVertical: rem(2)
    }
})

export default Wrapper;