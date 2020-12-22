import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { rem } from '../../utils';

function H1 ({ children }) {
    return (
        <Text style={styles.font}>{ children }</Text>
    );
}

const styles = StyleSheet.create({
    font: {
        fontSize: rem(3)
    }
})

export default H1