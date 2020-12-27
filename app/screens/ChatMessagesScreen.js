import { useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { FlatList, Text } from 'react-native';

import { ChatForm, Message, Screen, Wrapper } from '../components';
import { useAuth } from '../firebase/auth';
import { useFirestoreCrud } from '../firebase/useFirestoreCrud';
import { useFirestoreQuery, useLazyFirestoreQuery } from '../firebase/useFirestoreQuery';
import { rem } from '../utils';
import LoadingScreen from './LoadingScreen';

function ChatMessagesScreen(props) {
    const [ refreshing, setRefreshing ] = useState(false);
    const [ chatId, setChatId ] = useState(null);
    const { params } = useRoute();
    const { user } = useAuth()
    const { data, refetch: refetchChatData } = useFirestoreQuery(fs => fs.collection('chats')
        .where("participants", "in", 
            [[user && user.uid, params.actor]],
        )
    );
    const { addDocument: addNewChat, state: { data: addNewChatData, status: addNewChatStatus } } = useFirestoreCrud(`chats`)
    const { fetchQuery: fetchMessages, data: messagesData } = useLazyFirestoreQuery();
    
    const handleNewChat = chatData => {
        if (chatData) {
            setChatId(chatData.id)
            fetchMessages(fs => fs.collection(`chats/${chatData.id}/messages`).orderBy("timestamp", "asc"));
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
            fetchMessages(fs => fs.collection(`chats/${addNewChatData.id}/messages`).orderBy("timestamp", "asc"));
            refetchChatData()
        }
    }, [addNewChatStatus])
    
    useEffect(() => {
        messagesData && console.log(messagesData) 
    }, [messagesData])
    
    if (!data) {
        return <LoadingScreen />
    } else return (
        <Screen ignore>
            <Wrapper style={{ paddingHorizontal: rem(1) }}> 
                <FlatList 
                    data={ messagesData }
                    keyExtractor={ m => m.id }
                    inverted
                    refreshing={ refreshing }
                    renderItem={({ item }) =>
                        item.content && <Message
                            data={ item }
                            isSender={ item.sender == user.uid && true }
                        />
                    }
                />
                <ChatForm messagePath={`chats/${chatId}/messages`} />
            </Wrapper>
        </Screen>
    );
}

export default ChatMessagesScreen;