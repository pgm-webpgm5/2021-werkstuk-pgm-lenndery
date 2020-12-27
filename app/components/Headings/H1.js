import React from 'react';
import { Text, StyleSheet } from 'react-native';

import { rem } from '../../utils';
import { AppText } from '..';

function H1 ({ children }) {
    return (
        <AppText style={styles.font}>{ children }</AppText>
    );
}

const styles = StyleSheet.create({
    font: {
        fontSize: rem(3)
    }
})

export default H1