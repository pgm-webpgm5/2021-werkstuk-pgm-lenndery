import React from 'react';
import { Text, StyleSheet } from 'react-native';

import { AppText } from '..';
import { rem } from '../../utils'

function H2 ({ children }) {
    return (
        <AppText style={styles.font}>{ children }</AppText>
    );
}

const styles = StyleSheet.create({
    font: {
        fontSize: rem(2.5)
    }
})

export default H2