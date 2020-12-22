import React from 'react';
import { Text, StyleSheet } from 'react-native';

import { rem } from '../../utils'

function H4 ({ children, style }) {
    return (
        <Text style={ [styles.font, style] }>{ children }</Text>
    );
}

const styles = StyleSheet.create({
    font: {
        fontSize: rem(1.4)
    }
})

export default H4