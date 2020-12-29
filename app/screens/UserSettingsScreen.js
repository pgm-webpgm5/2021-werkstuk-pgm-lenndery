import React, { useContext, useEffect, useState } from 'react';
import { Button, Image, StyleSheet, Switch, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { AppButton, H3, H4, Label, Screen, Wrapper, Small, AppText, AppSwitch, ImageInput } from '../components';
import { circular, colors, textCenter } from '../config/defaultStyles';
import { useAuth } from '../firebase/auth';
import { useFirebaseStorage } from '../firebase/useFirebaseStorage';
import { useFirestoreCrud } from '../firebase/useFirestoreCrud';
import { useFirestoreQuery } from '../firebase/useFirestoreQuery';
import { rem } from '../utils';

function UserSettingsScreen(props) {    
    const navigation = useNavigation()
    const { logout, user } = useAuth();
    const { getDownloadURL, state: { data: userAvatarUri } } = useFirebaseStorage(user.avatar);
    const [ selectedImage, setSelectedImage ] = useState();
    const { uploadFile, state: uploadState } = useFirebaseStorage('user-avatars');
    const { updateDocument, state: updateUserState } = useFirestoreCrud(`users/${user.uid}`);
    const { updateDocument: updateUserActivity, state: updateUserActivityState } = useFirestoreCrud(`users/${ user && user.uid }`)
    
    const handleLogout = () => {
        logout()
        updateUserActivity({
            activity: 'logged_out',
            last_activity: new Date()
        })
    }
    
    console.log({
        updateUserActivityState
    })
        
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
    
    useEffect(() => {
        user && getDownloadURL()
    }, [])
    
    useEffect(() => {
        // console.log({ uploadState })
        uploadState.status === 'success' && updateDocument({
            avatar: uploadState.data.path
        })
    }, [uploadState])
    
    useEffect(() => {
        setSelectedImage(userAvatarUri)
    }, [userAvatarUri])
        
    return (
        <Screen>
            <Wrapper>                
                <ImageInput
                    style={ styles.userAvatar }
                    sourceUri={ selectedImage }
                    onChangeImage={ handleImageUpload }
                />
                <Wrapper y>  
                    <H4 style={[ textCenter, { marginBottom: rem(.4) } ]}>{ user.username }</H4>
                    <AppText style={[ textCenter, { opacity: .6 } ]}>{ user.email }</AppText>
                    <AppButton 
                        theme="small" 
                        title="edit profile" 
                        style={{ alignSelf: 'center', marginTop: rem(1) }} 
                        onPress={() => navigation.navigate('editProfile')}
                    />
                </Wrapper>
                <Wrapper y>  
                    <Label>Notifications</Label>
                        <AppSwitch label="Private messages" />
                        <AppSwitch label="Messages from favorite channels" />
                </Wrapper>
                
                <AppButton theme="opaque" title="Logout" onPress={handleLogout} />
            </Wrapper>
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