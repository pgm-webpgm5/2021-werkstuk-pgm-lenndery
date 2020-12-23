import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import Clipboard from 'expo-clipboard';
import Toast from 'react-native-toast-message';
import * as Animatable from 'react-native-animatable';

import { Small, AppText } from '..';
import { colors } from '../../config/defaultStyles';
import { borderRadius, rem, messageRecievedDate, vh } from '../../utils';

function Message({ data: { content, sender_name, timestamp_ms, gifs, photos }, isSender = false, style = {} }) {
    
    const copyToClipboard = text => {
        Clipboard.setString(text)
        Toast.show({
            text1: 'Message copied',
            position: 'bottom'
        });
    }
    
    return (
        <View style={[ styles.container, style ]}>
            <TouchableOpacity onLongPress={() => copyToClipboard(content)} activeOpacity={.6}>
                <>
                    { !isSender && <Small style={[ styles.messageSenderName ]}>{ sender_name }・{ messageRecievedDate(timestamp_ms) }</Small>}
                    
                    { gifs && gifs.map((g, index) => <Image key={ index } style={{ width: 150, height: 150, borderRadius: 12 }} source={{ uri: 'https://media.giphy.com/media/cXblnKXr2BQOaYnTni/source.gif' }} />) }
                    { photos && photos.map((g, index) => <Image key={ index } style={{ width: 150, height: 150, borderRadius: 12 }} source={{ uri: 'https://media.giphy.com/media/cXblnKXr2BQOaYnTni/source.gif' }} />) }
                    
                    { content && <AppText style={[ styles.message, isSender && stylesIsSender.message ]}>{ content }</AppText>}
                </>
            </TouchableOpacity>
        </View>
    );
}

const messageBorderRadius = 12;

const styles = StyleSheet.create({
    container: {
        marginBottom: rem(1)
    },
    messageSenderName: {
        marginBottom: rem(.4),
        color: colors.dark200,
    },
    messageTimeStamp: {
        marginTop: rem(.4),
        color: colors.dark200,
    },
    messageTimeStampWrapper: {
        // maxHeight: vh(0),
        // opacity: 0,
    },
    message: {
        alignSelf: 'flex-start',
        paddingVertical: rem(.4),
        paddingHorizontal: rem(.8),
        paddingBottom: rem(.6),
        maxWidth: '80%',
        color: 'white',
        backgroundColor: colors.dark300,
        ...borderRadius(5, messageBorderRadius, messageBorderRadius, messageBorderRadius)
    },
})

const stylesIsSender = StyleSheet.create({
    message: {
        alignSelf: 'flex-end',
        ...borderRadius(messageBorderRadius, 5, messageBorderRadius, messageBorderRadius)
    }
})

export default Message;