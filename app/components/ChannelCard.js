import React, { useEffect, useState } from 'react';
import { TouchableWithoutFeedback, TouchableOpacity, View, StyleSheet, Image, Text } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { AppText, AvatarBadge, Strong, AppTitle } from '.';
import { colors, circular } from '../config/defaultStyles';
import { useAuth } from '../firebase/auth';
import { storage } from '../firebase/firebase';
import { useFirestoreQuery, useLazyFirestoreQuery } from '../firebase/useFirestoreQuery';
import { rem } from '../utils';

function ChannelCard({ onPress, data, isPinned }) {
    const [ avatar, setAvatar ] = useState()
    const { user } = useAuth();
    
    const { data: lastMessageData } = useFirestoreQuery(fs => fs.collection(`channels/${data.id}/messages`)
        .orderBy("timestamp", "desc").limit(1)
    )
    
    const setAvatarUri = async (channelId) => {
        try {
            const uri = await storage.ref(`channel-avatars/${channelId}.jpg`).getDownloadURL()
            setAvatar(await uri);
        } catch (err) {
            setAvatar(null);
        }
    }
    
    const lastMessage = lastMessageData && lastMessageData.length != 0
    const lastMessageText = lastMessage && lastMessageData[0].content || 'lel';
    const lastMessageType = lastMessage && lastMessageData[0].type || 'generic';
    const lastMessageAuthor = lastMessage && lastMessageData[0].sender_name || '';
    const lastAuthor = lastMessage && lastMessageData[0].sender === user.uid;
    
    useEffect(() => {
        setAvatarUri(data.id)
    }, [data])
    
    // simulate random amount unread messages
    const randomUnreadMessages = Math.floor(Math.random()*11) + 1;
    
    return (
        <View style={{ backgroundColor: colors.dark500 }}>
            <TouchableOpacity onPress={onPress}>
                <View style={ styles.container }>
                    <AvatarBadge style={{ marginRight: rem(1.4) }} badgeContent={ randomUnreadMessages } uri={ avatar } />
                    <View style={ styles.channelInfo }>
                        <AppTitle h="5" style={ styles.channelName }># { data.channel_name }</AppTitle>
                        { lastMessage && <AppText style={ styles.channelLastMessagePreview }>
                            <Strong>{lastAuthor && 'You: '}</Strong> { lastMessageType !== 'photo' ? 
                            `${(lastMessageText).substring(0, 30)}...` :
                            (lastAuthor ? 'Image send' : 'Photo recieved')
                        }
                        </AppText> }
                    </View>
                    { isPinned && <MaterialCommunityIcons name="pin" size={24} color={ colors.grey500 } style={[ styles.pinIcon ]}/> }
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: colors.dark500,
        padding: rem(1)
    },
    channelInfo: {
        flex: 1,
        justifyContent: 'center'
    },
    channelName: {
        fontWeight: 'bold',
        color: colors.grey200,
    },
    channelLastMessagePreview: {
        color: colors.grey200,
        opacity: .6
    },
    pinIcon: {
        alignSelf: 'center'
    }
})

export default ChannelCard;