import React from 'react';
import { Text, StyleSheet } from 'react-native';

import { rem } from '../../utils'

function H3 ({ children, style }) {
    return (
        <Text style={ [styles.font, style] }>{ children }</Text>
    );
}

const styles = StyleSheet.create({
    font: {
        fontSize: rem(2)
    }
})

export default H3