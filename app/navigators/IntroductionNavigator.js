import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { RegisterScreen, LoginScreen } from '../screens';
import { screenHeader } from '../config/defaultStyles';

const Stack = createStackNavigator();

function IntroductionNavigator() {
    return (
        <Stack.Navigator initialRouteName="login">
            <Stack.Screen name="register" component={RegisterScreen} options={{
                headerShown: false,
                ...screenHeader,
            }}/>
            <Stack.Screen name="login" component={LoginScreen} options={({ route: { params } }) => ({
                headerShown: false,
                ...screenHeader,
            })} />
        </Stack.Navigator>
    )
}

export default IntroductionNavigator;