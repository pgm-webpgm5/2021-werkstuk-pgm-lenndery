import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { rem } from '../../utils';

function FormError({ error, visible }) {
    return (
        <View>{ error && visible &&
            <Text style={ styles.error }>{ error }</Text>
        }</View>
    );
}

const styles = StyleSheet.create({
    error: {
        color: 'tomato',
        marginBottom: rem(1)
    }
})

export default FormError; 