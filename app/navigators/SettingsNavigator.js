import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { UserSettingsScreen, UserEditScreen, UserEditLoginScreen } from '../screens';

const Stack = createStackNavigator();

function SettingsNavigator(props) {
    return (
        <>
            <Stack.Navigator>
                <Stack.Screen 
                    name="userOverview"
                    component={UserSettingsScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen 
                    name="editProfile"
                    component={UserEditScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen 
                    name="editLogin"
                    component={UserEditLoginScreen}
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack.Navigator>
        </>
    );
}

export default SettingsNavigator;