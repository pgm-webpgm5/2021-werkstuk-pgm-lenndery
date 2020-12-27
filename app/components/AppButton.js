import React from 'react';
import { Button, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { rem } from '../utils';
import { border, colors } from '../config/defaultStyles';

function FormSubmit({ title, theme = 'default', onPress, style, labelStyle, ...otherProps }) {    
    return (
        <TouchableOpacity activeOpacity={.7} style={[ styles.button, buttonThemes[theme], style ]} onPress={onPress} { ...otherProps }>
            <Text style={[ styles.buttonLabel, labelThemes[theme], labelStyle ]}>{ title }</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: rem(.8),
        paddingHorizontal: rem(1),
        backgroundColor: colors.primary,
        borderRadius: 8
    },
    buttonLabel: {
        color: 'white',
        textAlign: 'center',
        fontSize: rem(1),
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 4
    },
})

const buttonThemes = StyleSheet.create({
    default: {},
    secondary: {
        backgroundColor: null,
        ...border(2, 'solid', colors.primary)
    },
    simple: {
        backgroundColor: null,
        color: colors.primary
    },
    opaque: {
        backgroundColor: '#A31E2D30',
        color: colors.primary
    }
})

const labelThemes = StyleSheet.create({
    default: {},
    simple: {
        color: colors.primaryBright
    },
    opaque: {
        color: colors.primaryBright
    }
})

export default FormSubmit;