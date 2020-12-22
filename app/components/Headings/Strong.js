import React from 'react';
import { StyleSheet } from 'react-native';

import { AppText } from '..';

function Strong({ children, weight = 'bold' }) {
    return (
        <AppText style={{ fontWeight: weight }}>{ children }</AppText>
    );
}

export default Strong;