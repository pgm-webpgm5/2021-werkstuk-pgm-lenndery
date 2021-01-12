import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import * as Linking from 'expo-linking'
import { MaterialIcons } from '@expo/vector-icons';

import { Screen, ChannelCard, AppInput, Form, FormField, FormSubmit, AppText, Label } from '../components';
import { useFirestoreQuery } from '../firebase/useFirestoreQuery';
import { rem } from '../utils';
import { useAuth } from '../firebase/auth';

function ChannelOverviewScreen(props) {
    const navigation = useNavigation();
    const [ refreshing, setRefreshing ] = useState(false)
    const [ searched, setSearched ] = useState(false);
    const { data, refetch } = useFirestoreQuery(fs => fs.collection('channels'))
    const { logout, user } = useAuth();
    
    const handleSearch = ({ query }) => {
        if (query && searched) {
            setSearched(false)
            refetch()
        } else if (query) {
            setSearched(true)
            refetch(fs => fs.collection('channels').where("channel_name", "==", query))
        }
    }
        
    return (
        <Screen ignore>
            <Form style={{ marginLeft: rem(1), marginTop: rem(1), flexDirection: 'row' }} onSubmit={ handleSearch }>
                <FormField
                    name="query"
                    placeholder="Search channels"
                    containerStyle={{ flex: 1 }}
                />
                <FormSubmit style={{ backgroundColor: null }}><MaterialIcons name={searched ? 'search-off' : 'search' } size={ rem(1.6) } color="white" /></FormSubmit>
            </Form>
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
                ListEmptyComponent={(e) =>
                    <TouchableOpacity onPress={() => user.easterMode && Linking.openURL('https://www.youtube.com/watch?v=mTo8GiPQdPs')} activeOpacity={.6}>
                        <LottieView
                            style={{
                                width: 400,
                                height: 400,
                                backgroundColor: null,
                                alignSelf: 'center'
                            }}
                            autoPlay={ true }
                            source={require('../assets/werner.json')}
                        />
                        <Label style={{ textAlign: 'center', marginTop: -100, fontWeight: 'bold' }}>Werner couldn't find any{"\n"}channels with that name</Label>
                    </TouchableOpacity>
                }
            />
        </Screen>
    );
}

export default ChannelOverviewScreen;