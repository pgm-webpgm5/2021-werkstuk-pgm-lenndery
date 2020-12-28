import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, FlatList, LogBox, KeyboardAvoidingView, Platform, AppState } from 'react-native';
import Toast, { BaseToast } from 'react-native-toast-message';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import { colors } from './app/config/defaultStyles';
import { toastConfig } from './app/config/toastConfig';
import { SplashScreen, ChannelOverviewScreen, ChannelMessagesScreen, LoginScreen, WelcomeScreen, RegisterScreen } from './app/screens';
import { LoggedInCheck, AvoidKeyboard, H2 } from './app/components';
import { IntroductionNavigator, MainNavigator, MainTabNavigator } from './app/navigators';
import { useAuth, AuthProvider } from './app/firebase/auth';
import { vh } from './app/utils';
import { useKeyboardHeight } from './app/hooks';
import { useFirestoreCrud } from './app/firebase/useFirestoreCrud';

LogBox.ignoreAllLogs(true);

LogBox.ignoreAllLogs(['Setting a timer']);
    console.warn = message => {
    if (message.indexOf('Setting a timer') <= -1) {
        console.warn(message);
    }
};

export default function App() {
    return (
        <AuthProvider>
            <AppContent/>
        </AuthProvider>
    )
}

function AppContent() {    
    const { maxHeight } = useKeyboardHeight();
    const { user, noUserFound } = useAuth()
    const { updateDocument, state: updateUserActivityState } = useFirestoreCrud(`users/${ user && user.uid }`)
    
    useEffect(() => {
        user && AppState.addEventListener('change', appStateHandler);
        return () => {
            AppState.removeEventListener("change", appStateHandler);
        }
    }, [user])
    
    const appStateHandler = state => {
        const newActivityState = state == 'active' ? {
            activity: state,
            last_activity: new Date()
        } : {
            activity: state,
        }
        updateDocument(newActivityState)
    }

    return (
        <View style={[ styles.container, { maxHeight: maxHeight }]}>
            <StatusBar style="light" />
            <Toast config={ toastConfig } style={{ zIndex: 1000 }} ref={(ref) => Toast.setRef(ref)} />
            
            { !user ? 
                <SplashScreen/>:
                <LoggedInCheck is={
                    <NavigationContainer theme={ DarkTheme }>
                        <MainTabNavigator />
                    </NavigationContainer>
                } isNot={
                    <NavigationContainer theme={ DarkTheme }>
                        <IntroductionNavigator />
                    </NavigationContainer>
                }/>
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
