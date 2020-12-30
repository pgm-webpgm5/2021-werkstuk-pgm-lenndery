import React from 'react';
import { View } from 'react-native';
import { useFormikContext } from 'formik';

import { AppInput, FormError } from '../';

function FormField({ name, onChange = () => null, containerStyle = {}, resetOnSend, ...otherProps }) {
    const { setFieldTouched, handleChange, errors, touched, initialValues, values } = useFormikContext()
    
    return (
        <View style={[ containerStyle ]}>
            <AppInput
                onBlur={ () => setFieldTouched(name) }
                onChangeText={(value) => { 
                    onChange(value)
                    return handleChange(name) 
                }}
                initialValue={ initialValues[name] }
                value={ resetOnSend && (values[name] || '') }
                { ...otherProps }
            />
            <FormError error={ errors[name] } visible={ touched[name] } />
        </View>
    );
}

export default FormField;