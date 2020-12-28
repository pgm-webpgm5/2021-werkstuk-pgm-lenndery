import React from 'react';
import { View } from 'react-native';
import { useFormikContext } from 'formik';

import { AppInput, FormError } from '../';

function FormField({ name, onChange = () => null, containerStyle = {} , ...otherProps }) {
    const { setFieldTouched, handleChange, errors, touched, handleSubmit, initialValues, initialStatus, values } = useFormikContext()
    
    return (
        <View style={[ containerStyle ]}>
            <AppInput
                onBlur={ () => setFieldTouched(name) }
                onChangeText={ handleChange(name) }
                initialValue={ initialValues[name] }
                { ...otherProps }
            />
            <FormError error={ errors[name] } visible={ touched[name] } />
        </View>
    );
}

export default FormField;