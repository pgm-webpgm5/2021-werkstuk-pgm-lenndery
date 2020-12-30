import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { Screen } from '../components';
import { colors } from '../config/defaultStyles';
import { rem } from '../utils';

function LoadingScreen(props) {
    return (
        <Screen style={[ styles.container ]}>
            <ActivityIndicator style={ styles.indicator } animating={ true } color={ colors.primary } size={ rem(3) }/>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: colors.dark500
    },
    indicator: {
        transform: [{ translateY: (rem(3)/2)*-1 }]
    }
})

export default LoadingScreen;