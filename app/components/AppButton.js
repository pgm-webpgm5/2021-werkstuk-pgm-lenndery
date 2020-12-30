import React from 'react';
import { Button, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { rem } from '../utils';
import { border, colors } from '../config/defaultStyles';
import { MaterialIcons } from '@expo/vector-icons';

function FormSubmit({ title, theme = 'default', onPress, style, labelStyle, materialIcon, icon, iconFill = colors.dark200, ...otherProps }) {    
    return (
        <TouchableOpacity activeOpacity={.7} style={[ styles.button, buttonThemes[theme], style, (materialIcon || icon) && styles.hasIcons ]} onPress={onPress} { ...otherProps }>
            <Text style={[ styles.buttonLabel, labelThemes[theme], labelStyle ]}>{ title }</Text>
            { materialIcon && <MaterialIcons name="navigate-next" size={24} color={ iconFill } /> }
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
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
    hasIcons: {
        justifyContent: 'space-between',
    }
})

const buttonThemes = StyleSheet.create({
    default: {},
    secondary: {
        backgroundColor: null,
        ...border(2, 'solid', colors.dark200)
    },
    simple: {
        backgroundColor: null,
        color: colors.primary
    },
    opaque: {
        backgroundColor: '#A31E2D30',
        color: colors.primary
    },
    small: {
        alignSelf: 'flex-start',
        borderRadius: 100,
        paddingVertical: rem(.5),
        paddingHorizontal: rem(.8),
        backgroundColor: '#A31E2D30',
        backgroundColor: colors.dark300
    },
})

const labelThemes = StyleSheet.create({
    default: {},
    secondary: {
        color: colors.grey300
    },
    simple: {
        color: colors.primaryBright
    },
    opaque: {
        color: colors.primaryBright
    },
    small: {
        fontSize: rem(.8),
        color: colors.primaryBright,
        color: 'white'
    }
})

export default FormSubmit;