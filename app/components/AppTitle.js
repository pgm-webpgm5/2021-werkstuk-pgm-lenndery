import React from 'react';
import { StyleSheet } from 'react-native';
import { rem } from '../utils';

import AppText from './AppText';

function AppTitle({ h, style, children }) {
    if (!h) throw new Error('AppTitle size was not defined');
    return <AppText style={[ styles[`h${h}`], style ] }>{ children} </AppText>;
}

const styles = StyleSheet.create({
    h1: {fontSize: rem(3)},
    h2: {fontSize: rem(2.5)},
    h3: {fontSize: rem(2)},
    h4: {fontSize: rem(1.4)},
    h5: {fontSize: rem(1.1)}
})

export default AppTitle;