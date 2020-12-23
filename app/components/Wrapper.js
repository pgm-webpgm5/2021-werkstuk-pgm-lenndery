import React from 'react';
import { View, StyleSheet } from 'react-native';
import { rem } from '../utils';

function Wrapper({ children, style }) {
    return (
        <View style={ [styles.wrapper, style] }>
            { children }
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        padding: rem(1)
    }
})

export default Wrapper;