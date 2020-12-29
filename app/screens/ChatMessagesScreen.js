import { useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { FlatList, Text, Modal, Image } from 'react-native';

import { AppButton, ChatForm, Message, Screen, Wrapper } from '../components';
import { useAuth } from '../firebase/auth';
import { useFirebaseStorage } from '../firebase/useFirebaseStorage';
import { useFirestoreCrud } from '../firebase/useFirestoreCrud';
import { useFirestoreQuery, useLazyFirestoreQuery } from '../firebase/useFirestoreQuery';
import { rem, vh } from '../utils';
import LoadingScreen from './LoadingScreen';

function ChatMessagesScreen(props) {
    const [ refreshing, setRefreshing ] = useState(false);
    const [ chatId, setChatId ] = useState(null);
    const { params } = useRoute();
    const { user } = useAuth()
    const { data, refetch: refetchChatData } = useFirestoreQuery(fs => fs.collection('chats')
        .where("participants", "in", [
            [ user && user.uid, params.actor ], 
            [ params.actor, user && user.uid ],
        ])
    );
    const { addDocument: addNewChat, state: { data: addNewChatData, status: addNewChatStatus } } = useFirestoreCrud(`chats`)
    const { fetchQuery: fetchMessages, data: messagesData } = useLazyFirestoreQuery();
    
    const handleNewChat = chatData => {
        if (chatData) {
            setChatId(chatData.id)
            fetchMessages(fs => fs.collection(`chats/${chatData.id}/messages`).orderBy("timestamp", "desc"));
        } else {
            addNewChat({participants: [
                user.uid,
                params.actor
            ]})
        }
    }

    useEffect(() => {
        if (data) {
            const [ chatData ] = data;
            handleNewChat(chatData)
        } 
    }, [data])
    
    useEffect(() => {
        if (addNewChatStatus === 'success') { 
            fetchMessages(fs => fs.collection(`chats/${addNewChatData.id}/messages`).orderBy("timestamp", "desc"));
            refetchChatData()
        }
    }, [addNewChatStatus])
    
    if (!data) {
        return <LoadingScreen />
    } else return (
        <Screen ignore>
            <Wrapper style={{ paddingHorizontal: 0, paddingVertical: 0 }}> 
                <FlatList 
                    style={{ padding: rem(1), paddingTop: rem(.5), height: '100%' }}
                    contentContainerStyle={{ paddingBottom: rem(1) }}
                    data={ messagesData }
                    keyExtractor={ m => m.id }
                    inverted
                    refreshing={ refreshing }
                    showsVerticalScrollIndicator={ false }
                    renderItem={({ item }) =>
                        item.content && <Message
                            data={ item }
                            isSender={ item.sender == user.uid && true }
                        />
                    }
                />
                <ChatForm 
                    messagePath={`chats/${chatId}/messages`} 
                    containerStyle={{ 
                        paddingTop: rem(1), 
                        paddingHorizontal: rem(1),
                    }}
                />
            </Wrapper>
        </Screen>
    );
}

export default ChatMessagesScreen;