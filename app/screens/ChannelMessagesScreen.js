import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, Button, Text, Image } from 'react-native';
import { Screen, Wrapper, Message, Form, FormField, FormSubmit, ChatForm } from '../components';
import { useNavigation, useRoute } from '@react-navigation/native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import { useFirestoreQuery } from '../firebase/useFirestoreQuery'
import { useFirestoreCrud } from '../firebase/useFirestoreCrud'
import { useAuth } from '../firebase/auth';
import { rem, vw } from '../utils';
import { colors } from '../config/defaultStyles';
import { useFirebaseStorage } from '../firebase/useFirebaseStorage';
import { ChannelDetailScreen } from '.';

function ChannelMessagesScreen(props) {    
    const { params } = useRoute();
    const { user } = useAuth();
    const [ refreshing, setRefreshing ] = useState(false);
    
    const { data: messagesData } = useFirestoreQuery(fs => fs.collection(`channels/${params.id}/messages`).orderBy("timestamp", "desc"));
    const { getDownloadURL, state: { data: channelAvatarUri } } = useFirebaseStorage(`channel-avatars/${params.id}.jpg`)
    
    useEffect(() => {
        getDownloadURL()
    }, [])
        
    return (
        <Screen ignore>
            <FlatList 
                contentContainerStyle={{ padding: rem(1)  }}
                data={ messagesData }
                keyExtractor={ m => m.id }
                inverted
                refreshing={ refreshing }
                renderItem={ ({item, index }) => 
                    item.content && <Message 
                        onPress={() => console.log('image bigger')} 
                        data={ item } 
                        isSender={ item.sender == user.uid && true }
                    />
                }
            />
            <ChatForm 
                messagePath={`channels/${params.id}/messages`}
                containerStyle={{
                    paddingTop: rem(1), 
                    paddingHorizontal: rem(1),
                }}
            />
        </Screen>
    );
}

export default ChannelMessagesScreen;