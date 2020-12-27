import React, { useState, useEffect } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { Screen, Wrapper, UserChatCard } from '../components';
import { useFirestoreQuery } from '../firebase/useFirestoreQuery';
import { useFirestoreCrud } from '../firebase/useFirestoreCrud';
import { useAuth } from '../firebase/auth';


function UsersOverviewScreen() {
    const navigation = useNavigation();
    const { user } = useAuth();
    const { data, refetch } = useFirestoreQuery(fs => fs.collection('users').orderBy("last_activity", "desc"))
    const [ refreshing, setRefreshing ] = useState(false)
    const isFocused = useIsFocused()
    const { updateDocument: updateUserActivity, state: updateUserActivityState } = useFirestoreCrud(`users/${ user && user.uid }`)

    useEffect(() => {
        isFocused && updateUserActivity({
            activity: 'active'
        })
    }, [isFocused])
    
    return (
        <Screen ignore>
            <FlatList 
                data={ data }
                keyExtractor={ u => u.id }
                refreshing={ refreshing }
                onRefresh={() => refetch()}
                renderItem={({ item }) => 
                    item.id !== user.uid && <UserChatCard data={ item } onPress={() => {
                        navigation.navigate('chatMessages', {
                            actor: item.id,
                            actorName: item.username
                        })
                    }} />
                }
            />
        </Screen>
    );
}

export default UsersOverviewScreen;