import React from 'react';
import { Formik, useFormikContext } from 'formik';
import { View } from 'react-native';

function Form({ children, initialValues = {}, onSubmit, validationSchema, style }) {           
    return (
        <View style={ style }>
            <Formik 
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {() =>
                    <>
                        { children }
                    </>
                }
            </Formik>
        </View>
    );
}

export default Form;