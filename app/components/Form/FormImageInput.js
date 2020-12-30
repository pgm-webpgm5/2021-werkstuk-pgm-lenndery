import React from 'react';
import { View } from 'react-native';
import ImageInput from './ImageInput';
import FormError from './FormError';
import { useFormikContext } from 'formik';

function FormImageInput({ name, style, iconStyle }) {
    const { values, setFieldValue, errors, touched } = useFormikContext();
    const imageUri = values[name]
    
    return (
        <>
            <ImageInput
                style={ style } 
                sourceUri={ imageUri } 
                onChangeImage={ uri => setFieldValue(name, uri) }
                iconStyle={ iconStyle }
            />
            <FormError error={ errors[name] } visible={ touched[name] }/>
        </>
    );
}

export default FormImageInput;