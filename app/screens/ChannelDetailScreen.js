import React from 'react';
import { ActivityIndicator, Image } from 'react-native';

import { Form, H4, Label, Screen, Wrapper } from '../components';
import { rem, vw } from '../utils';
import { colors } from '../config/defaultStyles';
import { useFirestoreQuery } from '../firebase/useFirestoreQuery';
import LoadingScreen from './LoadingScreen';

function ChannelDetailScreen({ channelId }) {
    const { data: channelData } = useFirestoreQuery(fs => fs.doc(`channels/${ channelId }`));
    
    return (
        <>
            {
                !channelData ? 
                <LoadingScreen/> : 
                <Screen ignore>
                    <Wrapper style={{ backgroundColor: colors.dark800 , height: '100%'}}>
                        <H4 style={{ marginBottom: rem(2) }}># { channelData.channel_name }</H4>
                        <Label>Users</Label>
                    </Wrapper>
                </Screen>
            }
        </>
    );
}

export default ChannelDetailScreen;