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

function Message({ data: { content, sender, sender_name, timestamp, type }, onPress, isSender = false, style = {} }) {
    const { data, status } = useFirestoreQuery(fs => fs.doc(`users/${sender}`));
    const [ username, setUsername ] = useState(sender_name || sender);
    const { getDownloadURL, state: { data: imageUri } } = useFirebaseStorage(content);
    
    const copyToClipboard = text => {
        Clipboard.setString(text)
        Toast.show({
            text1: 'Message copied',
            position: 'bottom'
        });
    }
    
    useEffect(() => {
        status === 'success' && setUsername(data.username)
    }, [status])
    
    useEffect(() => {
        type === 'photo' && getDownloadURL()  
    }, [])
    
    const PhotoMessage = ({ isSender, uri }) => (
        <View style={[ isSender && stylesIsSender.message, styles.photoMessage ]}>
            <Image style={[ styles.photo, isSender && stylesIsSender.photo]} source={{ uri: uri }} />
        </View>
    )
    
    const TextMessage = ({ isSender, content }) => (
        <AppText style={[ styles.message, isSender && stylesIsSender.message ]}>{ content }</AppText>
    )
    
    return (
        <View style={[ styles.container, style ]}>
            <TouchableOpacity onPress={onPress} onLongPress={() => type === 'generic' && copyToClipboard(content)} activeOpacity={.6}>
                <>
                    { !isSender && <Small style={[ styles.messageSenderName ]}>{ username }・{ messageRecievedDate(timestamp*1000) }</Small>}
                    
                    { content && type !== 'photo' && <TextMessage isSender={ isSender } content={ content } />}
                    { type === 'photo' && <PhotoMessage isSender={ isSender } uri={ imageUri } />}
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
        backgroundColor: colors.dark700,
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