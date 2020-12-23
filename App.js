import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, FlatList } from 'react-native';
import Toast, { BaseToast } from 'react-native-toast-message';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton, HeaderTitle } from '@react-navigation/stack';

import { colors, screenHeader } from './app/config/defaultStyles';
import { toastConfig } from './app/config/toastConfig';
import { SplashScreen, ChannelOverviewScreen, ChannelMessagesScreen } from './app/screens';
import { ChannelCard, Screen, Message, Wrapper } from './app/components';

export default function App() {    
    const [ loading, setLoading ] = useState(true);
        
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 3000)
    }, [])
    
    /**
     * first map
     * get index, check if message next index is from same user
     * combine if so and ignore following
     */
    
    const Stack = createStackNavigator();
    
    const StackNavigator = () => (
        <Stack.Navigator /*initialRouteName="Login" */>
            <Stack.Screen name="channels" component={ChannelOverviewScreen} options={{
                // headerShown: false
                ...screenHeader,
            }}/>
            <Stack.Screen name="channelMessages" component={ChannelMessagesScreen} options={{
                // headerShown: false
                ...screenHeader
            }}/>
        </Stack.Navigator>
    )
    
    return (
        <View style={styles.container}>
            <Toast config={ toastConfig } style={{ zIndex: 1000 }} ref={(ref) => Toast.setRef(ref)} />
            
            { loading ? 
                <SplashScreen/>:
                <NavigationContainer>
                    <StackNavigator />
                </NavigationContainer>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        // alignItems: 'center',
        // justifyContent: 'center',
    }
})
