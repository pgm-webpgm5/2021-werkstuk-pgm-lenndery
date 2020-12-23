import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { Logo, LogoLight } from '../assets'
import { Screen } from '../components';
import { rem, vw } from '../utils';

function SplashScreen(props) {
    return (
        <View style={styles.container}>
            <Animatable.View animation="fadeIn">
                {/* <Logo style={styles.logo}/> */}
                <LogoLight style={styles.logo}/>
            </Animatable.View>
        </View>
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

export default SplashScreen;