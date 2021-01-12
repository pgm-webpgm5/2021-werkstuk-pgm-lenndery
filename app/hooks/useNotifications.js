import React, { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

export default useNotifications = (notificationListener) => {
    useEffect(() => {
        registerForPushNotifications();
        notificationListener && Notifications.addNotificationResponseReceivedListener(notificationListener);
        
        return () => Notifications.removeNotificationSubscription(notificationListener);
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
}