import React, { useContext, useEffect } from 'react';
import { Text} from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

import { useAuth } from '../firebase/auth';

function LoggedInCheck({ is, isNot }) {
    const { user, noUserFound } = useAuth()
    
    useEffect(() => {
        registerForPushNotifications().then((resp) => console.log({ resp }))
    }, [])
    
    const registerForPushNotifications = async () => {
        try {
            const { granted } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            if (!granted) return;
            
            const token = await Notifications.getExpoPushTokenAsync();
        } catch (err) {
            console.log({ err });
        }
        
    }
    
    if (!noUserFound) return is;
    if (noUserFound) return isNot;
}

export default LoggedInCheck;