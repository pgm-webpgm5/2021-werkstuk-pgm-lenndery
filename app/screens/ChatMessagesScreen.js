import { useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { FlatList, Text, Modal, Image, View } from 'react-native';

import { AppButton, ChatForm, Message, Screen, Wrapper } from '../components';
import { border } from '../config/defaultStyles';
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
    
    // get chat data
    const { data, refetch: refetchChatData } = useFirestoreQuery(fs => fs.collection('chats')
        .where("participants", "in", [
            [ user.uid, params.actor ],
            [ params.actor, user.uid ],
        ])
    );
    
    // used for creating new chat
    const { addDocument: addNewChat, state: { data: addNewChatData, status: addNewChatStatus } } = useFirestoreCrud(`chats`);
    
    // get messages
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
    
    /**
     * check if chat exists
     * if not, create chat, otherwise load chat
     */

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
            <FlatList 
                contentContainerStyle={{ padding: rem(1)  }}
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
        </Screen>
    );
}

export default ChatMessagesScreen;