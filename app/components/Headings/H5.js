import React from 'react';
import { Text, StyleSheet } from 'react-native';

import { rem } from '../../utils'
import { AppText } from '..';

function H5 ({ children, style }) {
    return (
        <AppText style={[styles.font, style]}>{ children }</AppText>
    );
}

const styles = StyleSheet.create({
    font: {
        fontSize: rem(1.1),
        fontWeight: 'bold'
    }
})

export default H5