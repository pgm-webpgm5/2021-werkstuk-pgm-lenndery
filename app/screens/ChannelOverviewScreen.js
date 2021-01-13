import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import * as Linking from 'expo-linking'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import { Screen, Form, FormField, FormSubmit, AppText, Label, PinChannel, FormReset, AppButton } from '../components';
import { useFirestoreQuery } from '../firebase/useFirestoreQuery';
import { rem } from '../utils';
import { useAuth } from '../firebase/auth';
import { firebase } from '../firebase/firebase';

function ChannelOverviewScreen(props) {
    const [ refreshing, setRefreshing ] = useState(false)
    const [ searched, setSearched ] = useState(false);
    const { data, refetch: refetchChannels } = useFirestoreQuery(fs => fs.collection('channels').limit(30))
    const [ sortedChannels, setSortedChannels ] = useState(data);
    const { logout, user } = useAuth();
    const [ showOnlyPinned, setShowOnlyPinned ] = useState(false);
    
    const handleSearch = ({ query } = {}) => {
        setShowOnlyPinned(false);
        if (!query) { // show all channels if no query supplied
            setSearched(false)
            refetchChannels()
        } else { // search after channel if query supplied
            setSearched(true)
            refetchChannels(fs => fs.collection('channels').where("channel_name", "==", query))
        }
    }
    
    const getPinnedChannels = () => {
        setSearched(false)
        if (showOnlyPinned) refetchChannels()
        else refetchChannels(fs => fs.collection('channels').where(firebase.firestore.FieldPath.documentId(), "in", user.pinnedChannels))
    }
    
    useEffect(() => {
        // refetch channels after saved pins changed to keep them on top
        if (!searched) refetchChannels()
    }, [user.pinnedChannels])
    
    useEffect(() => {
        if (data) {
            // sort channels so pinned channels are on top
            const result = data.sort((a, b) => {
                const test = user.pinnedChannels?.find(channelId => channelId === a.id)
                if (test) return -1;
                else return a - b
            })
            setSortedChannels(result);
        }
    }, [data])
        
    return (
        <Screen ignore>
            <Form style={{ marginLeft: rem(1), marginTop: rem(1), flexDirection: 'row' }} onSubmit={ handleSearch }>
                <FormField
                    name="query"
                    placeholder="Search channels"
                    containerStyle={{ flex: 1 }}
                    resetOnSend
                />
                { searched ? 
                    <FormReset style={{ backgroundColor: null }} onPress={() => {
                        handleSearch() 
                        setSearched(false)
                    }}><MaterialIcons name="clear" size={ rem(1.6) } color="white" /></FormReset> :
                    <FormSubmit style={{ backgroundColor: null }}>
                        <MaterialIcons name="search" size={ rem(1.6) } color="white" />
                    </FormSubmit>
                }
                <AppButton 
                    style={{ backgroundColor: null, paddingLeft: 0 }} 
                    title={<MaterialCommunityIcons name={ showOnlyPinned ? 'pin' : 'pin-outline'} size={24} color="white" />} 
                    onPress={() => {
                        getPinnedChannels();
                        setShowOnlyPinned(prev => !prev);
                    }} />
            </Form>
            <FlatList
                data={ sortedChannels }
                keyExtractor={ c => c.id }
                refreshing={ refreshing }
                onRefresh={() => refetchChannels()}
                renderItem={({ item }, index) => 
                    <PinChannel item={ item } />
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