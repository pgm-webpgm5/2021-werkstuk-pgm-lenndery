import React from 'react';
import { Children } from 'react';
import { Text, StyleSheet } from 'react-native';
import AppText from '../AppText';

function Label({ children, style }) {
    return (
        <AppText style={ [styles.label, style] }>{ children }</AppText>
    );
}

const styles = StyleSheet.create({
    label: {
        color: 'grey',
        fontWeight: '700',
        textTransform: 'uppercase'
    }
})

export default Label;