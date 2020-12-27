import React from 'react';
import { Text, StyleSheet } from 'react-native';

import { rem } from '../../utils'
import { AppText } from '..';

function H3 ({ children, style }) {
    return (
        <AppText style={ [styles.font, style] }>{ children }</AppText>
    );
}

const styles = StyleSheet.create({
    font: {
        fontSize: rem(2)
    }
})

export default H3