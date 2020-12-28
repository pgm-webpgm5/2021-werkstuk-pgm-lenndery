import React, { useState, useEffect } from 'react';
import { Text, View , StyleSheet, KeyboardAvoidingView, StatusBar, TouchableWithoutFeedback} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Modal from 'react-native-modal';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { ChannelOverviewScreen, ChannelMessagesScreen, ChannelDetailScreen } from '../screens';
import { colors, screenHeader } from '../config/defaultStyles';
import { AppButton, Form, FormField, FormImageInput, FormSubmit, H4, Wrapper } from '../components';
import { rem, vh } from '../utils';
import { useKeyboardHeight, useAvatar } from '../hooks';
import { useFirestoreCrud } from '../firebase/useFirestoreCrud';
import { useAuth } from '../firebase/auth';
import { storage } from '../firebase/firebase';

const Stack = createStackNavigator();

function MainNavigator(props) {
    const [ modal, setModal ] = useState(false)
    const { maxHeight } = useKeyboardHeight()
    const { user } = useAuth()
    const { getAvatarUri, uploadAvatar } = useAvatar();
    const [ avatarFilePath, setAvatarFilePath ] = useState();
    const { state: { status: addedChannelStatus, data: addedChannelData }, addDocument: addChannel } = useFirestoreCrud(`channels`);
    const navigation = useNavigation();
    
    const avatarUpload = async (channelId, filePath) => {
        const fileResponse = await fetch(filePath);
        const fileBlob = await fileResponse.blob();
        
        const metadata = {
            contentType: 'image/jpeg'
        };
        const rootStorageRef = storage.ref();
        const imageRef = await rootStorageRef.child(`channel-avatars/${channelId}.jpg`);
        const upload = await imageRef.put(fileBlob, metadata);
    }
    
    const handleChannelCreation = ({ channelName, avatar }) => { 
        setAvatarFilePath(avatar)
        
        addChannel({
            admin: user.uid,
            channel_name: channelName,
            participants: [
                {
                    user: user.uid,
                    username: user.username
                }
            ]
        })
    }
    
    useEffect(() => {
        addedChannelStatus == 'success' && setModal(false)        
        // if (addedChannelStatus == 'success') avatarUpload(addedChannelData.id, avatarFilePath);
        if (addedChannelStatus == 'success') {
            (async () => {
                const upload = await uploadAvatar(avatarFilePath, `channel-avatars/${addedChannelData.id}.jpg`)
                console.log({ upload })
            })()
        };
    }, [addedChannelStatus])
    
    return (
        <>
            <Stack.Navigator /*initialRouteName="Login" */>
                <Stack.Screen name="channels" component={ChannelOverviewScreen} options={{
                    title: 'Channels',
                    headerShown: true,
                    headerRight: () => <AppButton theme="simple" title="New channel" labelStyle={{ color: 'white' }} onPress={() => setModal(!modal)}/>,
                    ...screenHeader,
                }}/>
                <Stack.Screen name="channelMessages" component={ChannelMessagesScreen} options={({ route: { params } }) => ({
                    ...screenHeader,
                    headerTitle: '# ' + params.channel_name
                })} />
            </Stack.Navigator>
            <Modal 
                animationType="slide" 
                style={[ styles.modalNewChannel, { maxHeight: maxHeight } ]} 
                visible={ modal } 
                statusBarTranslucent={ true } 
                avoidKeyboard={ false }
                hasBackdrop={ false }
                backdropColor="black"
                backdropOpacity={ 1 }
                backdropTransitionInTiming={ 30 }
                backdropTransitionOutTiming={ 30 }
                onSwipeComplete={() => setModal(false)}
                onBackdropPress={() => console.log(false)}
                swipeDirection="down"
            >
                <View style={ styles.modalContainer }> 
                    <Wrapper style={ styles.modalWrapper }>
                        <H4 style={{ marginBottom: rem(1) }}>New channel</H4>
                        <Form
                            onSubmit={handleChannelCreation}
                        >
                            <FormImageInput 
                                name="avatar"
                                style={{ alignSelf: 'center', marginBottom: rem(1) }}
                            />
                            <FormField 
                                name="channelName"
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="email-address"
                                placeholder="Channel name"
                                textContextType="emailAddress"
                            />
                            <FormSubmit title="Create channel"/>
                        </Form>
                        {/* <AppButton onPress={() => setModal(!modal)} title="Create channel"/> */}
                        <AppButton theme="simple" labelStyle={{ color: 'white' }} onPress={() => setModal(false)} title="Discard"/>
                    </Wrapper>
                </View>
            </Modal>
       </> 
            
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        justifyContent: 'flex-end',
        height: '100%',
        // backgroundColor: '#00000080',
    },
    modalWrapper: {
        backgroundColor: colors.dark300
    },
    modalNewChannel: {
        margin: 0,
        height: '100%',
        // maxHeight: 300
       backgroundColor: '#00000030'
    }
})

export default MainNavigator;