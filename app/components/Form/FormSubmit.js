import React from 'react';
import { Button, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useFormikContext } from 'formik';
import { rem } from '../../utils';
import { colors } from '../../config/defaultStyles';

function FormSubmit({ title, children, style }) {
    const { handleSubmit } = useFormikContext()
    
    return (
        <TouchableOpacity activeOpacity={.7} style={[ styles.button, style ]} onPress={handleSubmit}>
            { children ? 
                children : 
                <Text style={ styles.buttonLabel }>{ title }</Text>
            }
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
    }
})

export default FormSubmit;