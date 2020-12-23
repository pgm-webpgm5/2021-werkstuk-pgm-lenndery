import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { Screen, Wrapper, Message } from '../components';

import messagesData from '../assets/fake_data/messages.json';

function ChannelMessagesScreen(props) {
    const messages = messagesData.messages;
    const loadOffsetToAdd = 5;
    
    const [ refreshing, setRefreshing ] = useState(false);
    const [ loadOffset, setLoadOffset ] = useState(20);
    const [ loadedMessages, setLoadedMessages ] = useState(messages.slice(0, 50));
    
    return (
        <Screen ignore>
            <View>
                <Wrapper style={{ paddingTop: 0 }}>
                    <FlatList 
                        data={ loadedMessages }
                        keyExtractor={ m => m.timestamp_ms }
                        refreshing={ refreshing }
                        onRefresh={ e => console.log('refresh') }
                        onEndReached={ ({ treshold }) => { 
                            // const newOffset = loadOffset + loadOffsetToAdd;
                            // const messagesToAdd = messages.splice(loadOffset, newOffset)
                            // console.log(loadOffset, newOffset)
                            // console.log(messagesToAdd.reverse().map(m => m.content))
                            // setLoadedMessages([...messagesToAdd, ...loadedMessages])
                            // setLoadOffset(newOffset) 
                        }}
                        onEndReachedThreshold={ .1 }
                        inverted
                        renderItem={ ({item, index }) => 
                            <Message isSender={false} data={ item } isSender={ item.sender_name == 'Lennert De Ryck' && true }/>
                        }
                    />
                </Wrapper>
            </View>
        </Screen>
    );
}

export default ChannelMessagesScreen;