import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, FlatList, LogBox, KeyboardAvoidingView, Platform, StatusBar, AppState } from 'react-native';
import Toast, { BaseToast } from 'react-native-toast-message';
import { NavigationContainer } from '@react-navigation/native';

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
    const [ loading, setLoading ] = useState(true);
    const { maxHeight } = useKeyboardHeight();
    const { user } = useAuth()
    const { updateDocument, state: updateUserActivityState } = useFirestoreCrud(`users/${ user && user.uid }`)
    
    useEffect(() => {
        AppState.addEventListener('change', appStateHandler);
        // AppState.addEventListener('focus', appStateHandler);
        // AppState.addEventListener('blur', appStateHandler);
        return () => {
            AppState.removeEventListener("change", appStateHandler);
            // AppState.removeEventListener("focus", appStateHandler);
            // AppState.removeEventListener("blur", appStateHandler);
        }
    }, [])
    
    const appStateHandler = state => {
        const newActivityState = state == 'active' ? {
            activity: state,
            last_activity: new Date()
        } : {
            activity: state,
        }
        updateDocument(newActivityState)
        console.log({ state })
    }
    
    console.log({ updateUserActivityState })
    
    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false)
        }, 3000)
        return () => timeout
    }, [])
    
    /**
     * first map
     * get index, check if message next index is from same user
     * combine if so and ignore following
     */

    return (
        <View style={[ styles.container, { maxHeight: maxHeight }]}>
            <Toast config={ toastConfig } style={{ zIndex: 1000 }} ref={(ref) => Toast.setRef(ref)} />
            
            { loading ? 
                <SplashScreen/>:
                <LoggedInCheck is={
                    <NavigationContainer>
                        <MainTabNavigator />
                    </NavigationContainer>
                } isNot={
                    <NavigationContainer>
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
