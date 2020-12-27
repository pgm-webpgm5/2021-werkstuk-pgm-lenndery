import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, Button } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { Logo, LogoLight } from '../assets'
import { Screen } from '../components';
import { rem, vw } from '../utils';

function WelcomeScreen(props) {
    return (
        <Screen style={styles.container}>
            <LogoLight style={styles.logo}/>
            <Button title="Login" />
            <Button title="Register" />
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoWrapper: {
        
    },
    logo: {
        height: 50,
        width: vw(50),
    },
    logoIcon: {
        height: 50,
        width: vw(30)
    }
});

export default WelcomeScreen;