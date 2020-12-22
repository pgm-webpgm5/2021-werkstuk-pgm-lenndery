import React from 'react';
import { Text, StyleSheet } from 'react-native';

import { rem } from '../../utils'

function H2 ({ children }) {
    return (
        <Text style={styles.font}>{ children }</Text>
    );
}

const styles = StyleSheet.create({
    font: {
        fontSize: rem(2.5)
    }
})

export default H2