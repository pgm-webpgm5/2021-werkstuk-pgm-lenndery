import React from 'react';
import { StyleSheet } from 'react-native';

import { AppText } from '..';
import { rem } from '../../utils';

function Small({ children, style = {}, ...otherProps }) {
    return (
        <AppText style={[ styles.small, style]} { ...otherProps }>{ children }</AppText>
    );
}

const styles = StyleSheet.create({
    small: {
        fontSize: rem(.8)
    }
})

export default Small;