import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, Button, Text, Image } from 'react-native';
import { Screen, Wrapper, Message, Form, FormField, FormSubmit, ChatForm } from '../components';
import { useNavigation, useRoute } from '@react-navigation/native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import { useFirestoreQuery } from '../firebase/useFirestoreQuery'
import { useFirestoreCrud } from '../firebase/useFirestoreCrud'
import { firestore } from '../firebase/firebase';
import { useAuth } from '../firebase/auth';
import { rem, vw } from '../utils';
import { colors } from '../config/defaultStyles';
import { useFirebaseStorage } from '../firebase/useFirebaseStorage';
import { ChannelDetailScreen } from '.';

function ChannelMessagesScreen(props) {
    const loadOffsetToAdd = 5;
    
    const { params } = useRoute()
    const { user } = useAuth();
    const [ refreshing, setRefreshing ] = useState(false);
    const swipable = useRef();
    
    const { state, deleteDocument, addDocument, setDocumentByID } = useFirestoreCrud(`channels/${params.id}/messages`);
    const { data: messagesData } = useFirestoreQuery(fs => fs.doc(`channels/${params.id}`).collection('messages').orderBy("timestamp", "desc"));
    const { getDownloadURL, state: { data: channelAvatarUri } } = useFirebaseStorage(`channel-avatars/${params.id}.jpg`)
    
    useEffect(() => {
        getDownloadURL()
    }, [])
        
    return (
        <Swipeable
            ref={ swipable }
            overshootRight={ false }
            renderRightActions={() =>
                <View style={{ width: vw(80), backgroundColor: colors.dark800 }}>
                    <ChannelDetailScreen channelId={ params.id } />
                </View>
            }
        >  
            <Screen ignore>
                <View>
                    <Wrapper style={{ padding: rem(1), paddingTop: 0 }}>
                        <FlatList 
                            data={ messagesData }
                            keyExtractor={ m => m.id }
                            inverted
                            refreshing={ refreshing }
                            // onRefresh={ e => console.log('refresh') }
                            // onEndReached={ ({ treshold }) => { 
                                // const newOffset = loadOffset + loadOffsetToAdd;
                                // const messagesToAdd = messages.splice(loadOffset, newOffset)
                                // console.log(loadOffset, newOffset)
                                // console.log(messagesToAdd.reverse().map(m => m.content))
                                // setLoadedMessages([...messagesToAdd, ...loadedMessages])
                                // setLoadOffset(newOffset) 
                            // }}
                            // onEndReachedThreshold={ .1 }
                            renderItem={ ({item, index }) => 
                                item.content && <Message 
                                    onPress={() => deleteDocument(item.id)} 
                                    data={ item } 
                                    isSender={ item.sender == user.uid && true }
                                />
                            }
                        />
                    </Wrapper>

                    <Wrapper style={{ paddingHorizontal: rem(1) }}>
                        <ChatForm 
                            messagePath={`channels/${params.id}/messages`}
                        />
                    </Wrapper>
                </View>
            </Screen>
        </Swipeable>
    );
}

export default ChannelMessagesScreen;