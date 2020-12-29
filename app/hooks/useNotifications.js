import React, { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

export default useNotifications = (notificationListener) => {
    useEffect(() => {
        registerForPushNotifications().then((resp) => console.log({ resp }));
        notificationListener && Notifications.addNotificationResponseReceivedListener(notificationListener);
        
        return () => Notifications.removeNotificationSubscription(notificationListener);
    }, [])
    
    const registerForPushNotifications = async () => {
        try {
            const { granted } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            if (!granted) return;
            
            const token = await Notifications.getExpoPushTokenAsync();
            console.log({ token })
        } catch (err) {
            console.log({ err });
        }  
    }
}