import React, { useContext, useEffect, useState } from 'react';
import { Button, Image, StyleSheet, Switch, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AppButton, Label, Screen, Wrapper, Small, AppText, AppSwitch, ImageInput, AppTitle } from '../components';
import { circular, colors, textCenter } from '../config/defaultStyles';
import { useAuth } from '../firebase/auth';
import { useFirebaseStorage } from '../firebase/useFirebaseStorage';
import { useFirestoreCrud } from '../firebase/useFirestoreCrud';
import { rem } from '../utils';

function UserSettingsScreen(props) {    
    const navigation = useNavigation()
    const { logout, user } = useAuth();
    const { getDownloadURL, state: { data: userAvatarUri } } = useFirebaseStorage(user.avatar);
    const [ selectedImage, setSelectedImage ] = useState();
    const { uploadFile, state: uploadState } = useFirebaseStorage('user-avatars');
    const { updateDocument, state: updateUserState } = useFirestoreCrud(`users/${user.uid}`);
    const { updateDocument: updateEasterMode, state: updateEasterModeState } = useFirestoreCrud(`users/${user.uid}`);
        
    const handleImageUpload = uri => {
        if (uri) {
            setSelectedImage(uri)
            uploadFile(uri, user.uid)
        } else {
            updateDocument({
                avatar: null
            })
        }
    }
    
    const handleEasterMode = value => {
        updateEasterMode({
            easterMode: value
        });
    }
    
    useEffect(() => {
        user && getDownloadURL()
    }, [])
    
    useEffect(() => {
        uploadState.status === 'success' && updateDocument({
            avatar: uploadState.data.path
        })
    }, [uploadState])
    
    useEffect(() => {
        setSelectedImage(userAvatarUri)
    }, [userAvatarUri])
        
    return (
        <Screen style={{ height: '100%' }}>   
            <Wrapper t>
                <ImageInput
                    style={ styles.userAvatar }
                    sourceUri={ selectedImage }
                    onChangeImage={ handleImageUpload }
                />
            </Wrapper>           
            <Wrapper y style={{ height: null }}>  
                <AppTitle h="4" style={[ textCenter, { marginBottom: rem(.4) } ]}>{ user.username }</AppTitle>
                <AppText style={[ textCenter, { opacity: .6 } ]}>{ user.email }</AppText>
                <AppButton
                    theme="small" 
                    title="edit profile"
                    style={{ marginTop: rem(1), alignSelf: 'center' }}
                    onPress={() => navigation.navigate('editProfile')}
                    />
                <AppButton
                    theme="small" 
                    title="change password"
                    style={{ alignSelf: 'center', marginTop: rem(1) }}
                    onPress={() => navigation.navigate('editLogin')}
                />
            </Wrapper>
            <Wrapper y style={{ height: null }}>  
                <Label>Notifications</Label>
                <AppSwitch
                    label="Private messages" 
                    onValueChange={val => AsyncStorage.setItem('@notificationsPrivate', val)}
                />
                <AppSwitch
                    label="Messages from favorite channels" 
                    onValueChange={val => AsyncStorage.setItem('@notificationsPinnedChannels', val)}
                />
                <Label style={{ marginTop: rem(1.4) }}>Other settings</Label>
                <AppSwitch label="Easter mode" defaultState={ user.easterMode || false } onValueChange={handleEasterMode}/>
            </Wrapper>
            
            <AppButton theme="opaque" title="Logout" onPress={() => logout()} />
        </Screen>
    );
}

const styles = StyleSheet.create({
    userAvatar: {
        alignSelf: 'center',
        ...circular(120)
    },
})

export default UserSettingsScreen;