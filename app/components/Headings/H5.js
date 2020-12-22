import React from 'react';
import { Text, StyleSheet } from 'react-native';

import { rem } from '../../utils'

function H5 ({ children, style }) {
    return (
        <Text style={[styles.font, style]}>{ children }</Text>
    );
}

const styles = StyleSheet.create({
    font: {
        fontSize: rem(1.1),
        fontWeight: 'bold'
    }
})

export default H5