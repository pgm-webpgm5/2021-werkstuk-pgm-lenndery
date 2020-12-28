import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import Clipboard from 'expo-clipboard';
import Toast from 'react-native-toast-message';
import * as Animatable from 'react-native-animatable';

import { Small, AppText } from '..';
import { colors, borderRadius } from '../../config/defaultStyles';
import { rem, messageRecievedDate, vh, vw } from '../../utils';
import { useFirestoreQuery } from '../../firebase/useFirestoreQuery';
import { useFirebaseStorage } from '../../firebase/useFirebaseStorage';

function Message({ data: { content, sender, sender_name, timestamp, gifs, photos, type }, onPress, isSender = false, style = {} }) {
    const { data, status } = useFirestoreQuery(fs => fs.doc(`users/${sender}`))
    const [ username, setUsername ] = useState(sender_name || sender)
    const { getDownloadURL, state: { data: imageUri } } = useFirebaseStorage(content)
    
    useEffect(() => {
        status === 'success' && setUsername(data.username)
    }, [status])
    
    const copyToClipboard = text => {
        Clipboard.setString(text)
        Toast.show({
            text1: 'Message copied',
            position: 'bottom'
        });
    }
    
    useEffect(() => {
        type === 'photo' && getDownloadURL()  
    }, [])
    
    return (
        <View style={[ styles.container, style ]}>
            <TouchableOpacity onPress={onPress} onLongPress={() => copyToClipboard(content)} activeOpacity={.6}>
                <>
                    { !isSender && <Small style={[ styles.messageSenderName ]}>{ username }・{ messageRecievedDate(timestamp*1000) }</Small>}
                    
                    { gifs && gifs.map((g, index) => <Image key={ index } style={{ width: 150, height: 150, borderRadius: 12 }} source={{ uri: 'https://media.giphy.com/media/cXblnKXr2BQOaYnTni/source.gif' }} />) }
                    { photos && photos.map((g, index) => <Image key={ index } style={{ width: 150, height: 150, borderRadius: 12 }} source={{ uri: 'https://media.giphy.com/media/cXblnKXr2BQOaYnTni/source.gif' }} />) }
                    
                    { content && type !== 'photo' && <AppText style={[ styles.message, isSender && stylesIsSender.message ]}>{ content }</AppText>}
                    { type === 'photo' && <View style={[ type !== 'photo' && styles.message, isSender && stylesIsSender.message, type === 'photo' & styles.photoMessage ]}>
                        <Image style={[ styles.photo, isSender && stylesIsSender.photo]} source={{ uri: imageUri }} />
                    </View>}
                </>
            </TouchableOpacity>
        </View>
    );
}

const messageBorderRadius = 12;

const styles = StyleSheet.create({
    container: {
        marginTop: rem(1)
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
    photoMessage: {
        padding: 0,
        paddingVertical: 0,
        paddingHorizontal: 0,
        overflow: 'hidden',
        ...borderRadius(5, messageBorderRadius, messageBorderRadius, messageBorderRadius)
    },
    photo: {
        width: 200,
        height: 200,
        ...borderRadius(5, messageBorderRadius, messageBorderRadius, messageBorderRadius)
    }
})

const stylesIsSender = StyleSheet.create({
    message: {
        alignSelf: 'flex-end',
        ...borderRadius(messageBorderRadius, 5, messageBorderRadius, messageBorderRadius)
    },
    photo: {
        alignSelf: 'flex-end',
        ...borderRadius(messageBorderRadius, 5, messageBorderRadius, messageBorderRadius)
    }
})

export default Message;