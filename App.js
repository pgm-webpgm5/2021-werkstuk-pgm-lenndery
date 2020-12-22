import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { colors } from './app/config/defaultStyles';
import { SplashScreen } from './app/screens';
import { ChannelCard, Screen } from './app/components';

export default function App() {
    const [ loading, setLoading ] = useState(true);
    
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 3000)
    }, [])
    
    return (
        <View style={styles.container}>
            { loading ? 
                <SplashScreen/>:
                <Screen>
                    <ChannelCard/>
                </Screen>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: colors.background,
        // alignItems: 'center',
        // justifyContent: 'center',
    }
})
