import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { LogoIcon } from '../assets';
import { circular, colors } from '../config/defaultStyles';
import { MainNavigator } from '.';
import { rem } from '../utils';
import { UserSettingsScreen } from '../screens';
import { useFirebaseStorage } from '../firebase/useFirebaseStorage';
import { useAuth } from '../firebase/auth';
import { useEffect } from 'react/cjs/react.development';
import UsersNavigator from './UsersNavigator';

const Tab = createBottomTabNavigator();

function MainTabNavigator(props) {
    const avatarUri = 'https://lh3.googleusercontent.com/proxy/CIci0GaotXqGnpOM0DEgm7uPpnwpMDfwIe5-IQhKsR3FrZLGvCIaJEJp7bXc898DAGuFrskM7_b08-IVENtdg-hAqeWC7sBvd2Gf9TV-KO9ee0zD5Q';
    
    const { user } = useAuth();
    const { getDownloadURL, state: { data: userAvatarUri} } = useFirebaseStorage(user.avatar)
    
    useEffect(() => {
        getDownloadURL()
    }, [])
    
    return (
        <Tab.Navigator tabBarOptions={{
            activeBackgroundColor: colors.dark800,
            activeTintColor: 'white',
            style: {
                borderTopWidth: 0,
                backgroundColor: colors.dark700,
                height: 60
            },
            showLabel: false,
            keyboardHidesTabBar: true
        }}>
            <Tab.Screen
                name="directMessages"
                component={UsersNavigator}
                options={{
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="message-text" size={rem(1.6)} color={ color } />,
                }}
            />
            <Tab.Screen
                name="inbox"
                component={MainNavigator}
                options={{
                    tabBarIcon: () => <LogoIcon style={{ width: 30, height: 30 }} />,
                }}
            />
            <Tab.Screen
                name="accountSettings"
                component={UserSettingsScreen}
                options={{
                    // tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account" size={rem(1.6)} color={ color } />,
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account" size={rem(1.6)} color={ color } />
                }}
            />
        </Tab.Navigator>
    );
}

export default MainTabNavigator;