import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { rem } from '../utils';

function AppText({ children, style }) {
    return (
        <Text style={ [styles.default, style] }>{ children }</Text>
    );
}

const styles = StyleSheet.create({
    default: {
        fontSize: rem(1)
    }
})

export default AppText;