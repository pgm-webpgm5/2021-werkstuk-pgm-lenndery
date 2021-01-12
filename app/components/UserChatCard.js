import React, { useEffect, useState } from 'react';
import { TouchableWithoutFeedback, TouchableOpacity, View, StyleSheet, Image, Text } from 'react-native';

import { AppText, AvatarBadge, Strong, UserAvatarBadge, AppTitle } from '.';
import { colors, circular } from '../config/defaultStyles';
import { useAuth } from '../firebase/auth';
import { storage } from '../firebase/firebase';
import { useFirebaseStorage } from '../firebase/useFirebaseStorage';
import { useFirestoreQuery, useLazyFirestoreQuery } from '../firebase/useFirestoreQuery';
import { rem } from '../utils';

function ChannelCard({ onPress, data }) {
    const { getDownloadURL: getUserAvatar, state: { data: userAvatarUri } } = useFirebaseStorage(data.avatar);
    
    useEffect(() => {
        getUserAvatar()
    }, [])
    
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={ styles.container }>
                <UserAvatarBadge uri={ userAvatarUri } status={ data.activity } lastActive={ data.last_activity?.seconds || 0 } style={{ marginRight: rem(1.4) }} />
                <View style={ styles.channelInfo }>
                    <AppTitle h="5" style={ styles.channelName }>{ data.username }</AppTitle>
                    {/* { lastMessage && <AppText style={ styles.channelLastMessagePreview }><Strong>{lastAuthor && 'You: '}</Strong> {(lastMessageText).substring(0, 30)}...</AppText> } */}
                </View>
                {/* <AvatarBadge style={{ marginRight: rem(1.4) }} uri={ avatar } />
                <View style={ styles.channelInfo }>
                    <AppTitle h="5" style={ styles.channelName }># { data.channel_name }</AppTitle>
                    { lastMessage && <AppText style={ styles.channelLastMessagePreview }><Strong>{lastAuthor && 'You: '}</Strong> {(lastMessageText).substring(0, 30)}...</AppText> }
                </View> */}
            </View>
        </TouchableOpacity>
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
    }
})

export default ChannelCard;