import React from 'react';
import AppText from './AppText';

function AppTitle({ h, style }) {
    if (!h) throw new Error('AppTitle size was not defined');
    return <AppText style={[ styles[`h${h}`], style ] }></AppText>;
}

export default AppTitle;