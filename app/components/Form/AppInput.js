import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { useFormikContext } from 'formik'

import { rem } from '../../utils';
import { colors, border } from '../../config/defaultStyles';

function AppInput({ icon, ...otherProps }) {    
    return (
        <View style={[styles.wrapper, otherProps.multiline && styles.areaWrapper]}>
            { icon && <MaterialCommunityIcons style={styles.icon} name={icon} size={24} color="black" />}
            <TextInput style={[styles.input, otherProps.multiline && styles.area]} { ...otherProps } placeholderTextColor={ colors.grey500 }/>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.dark400,
        padding: rem(.6),
        paddingHorizontal: rem(1),
        marginBottom: rem(1),
        borderRadius: 8,
        ...border(2, 'solid', colors.grey700)
    },
    icon: {
        marginRight: rem(1.2),
        color: '#948461'
    },
    input: {
        color: 'white',
        fontSize: rem(1),
        flex: 1
    },
    areaWrapper: {
        alignItems: "flex-start",
    },
    area: {
        minHeight: 300,
        textAlignVertical: "top"
    }
})

export default AppInput;