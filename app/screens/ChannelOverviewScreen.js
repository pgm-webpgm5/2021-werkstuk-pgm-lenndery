import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { firestore } from '../firebase/firebase'
import { Screen, ChannelCard } from '../components';
import channelData from '../assets/fake_data/channels.json';
import { useFirestoreQuery } from '../firebase/useFirestoreQuery';

function ChannelOverviewScreen(props) {
    const navigation = useNavigation();
    const [ refreshing, setRefreshing ] = useState(false)
    const { data, refetch } = useFirestoreQuery(fs => fs.collection('channels'))
    
    useEffect(() => {
        console.log(data)
    }, [data])
        
    return (
        <Screen ignore>
            <FlatList
                data={ data }
                keyExtractor={ c => c.id }
                refreshing={ refreshing }
                onRefresh={() => refetch()}
                renderItem={({ item }) => 
                    <ChannelCard data={ item } onPress={() => navigation.navigate('channelMessages', { 
                        id: item.id,
                        channel_name: item.channel_name
                    })}/>
                }
            />
        </Screen>
    );
}

export default ChannelOverviewScreen;