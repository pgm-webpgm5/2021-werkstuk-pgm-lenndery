import React from 'react';
import { Text, StyleSheet } from 'react-native';

import { rem } from '../../utils'
import { AppText } from '..';

function H4 ({ children, style }) {
    return (
        <AppText style={ [styles.font, style] }>{ children }</AppText>
    );
}

const styles = StyleSheet.create({
    font: {
        fontSize: rem(1.4)
    }
})

export default H4