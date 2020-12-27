import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ChatMessagesScreen, UsersOverviewScreen } from '../screens';
import { screenHeader } from '../config/defaultStyles';

const Stack = createStackNavigator();

function UsersNavigator(props) {
    return (
        <>
            <Stack.Navigator>
                <Stack.Screen
                    name="users"
                    component={UsersOverviewScreen}
                    options={{
                        title: 'Users',
                        ...screenHeader
                    }}
                />
                <Stack.Screen
                    name="chatMessages"
                    component={ChatMessagesScreen}
                    options={({ route: { params }}) => ({
                        title: params.actorName,
                        ...screenHeader
                    })}
                />
            </Stack.Navigator>
        </>
    );
}

export default UsersNavigator;