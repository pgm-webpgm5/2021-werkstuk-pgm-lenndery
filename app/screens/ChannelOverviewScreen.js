import React from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Screen, ChannelCard } from '../components';
import channelData from '../assets/fake_data/channels.json';

function ChannelOverviewScreen(props) {
    const navigation = useNavigation();
    
    return (
        <Screen ignore>
            <FlatList
                data={ channelData }
                keyExtractor={ c => c.channel_id }
                renderItem={({ item }) => 
                    <ChannelCard onPress={() => navigation.navigate('channelMessages', { 
                        id: item.channel_id
                    })}/>
                }
            />
        </Screen>
    );
}

export default ChannelOverviewScreen;