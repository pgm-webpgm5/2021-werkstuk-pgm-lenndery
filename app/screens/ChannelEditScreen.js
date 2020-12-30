import React, { useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import * as Linking from 'expo-linking'

import { AvoidKeyboard, Screen, H3, Form, FormField, FormSubmit, Wrapper, AppButton } from '../components';
import { useFirestoreQuery } from '../firebase/useFirestoreQuery';
import LoadingScreen from './LoadingScreen';
import { useFirestoreCrud } from '../firebase/useFirestoreCrud';
import { Alert } from 'react-native';
import { rem } from '../utils';

function ChannelEditScreen(props) {
    const { params } = useRoute();
    const navigation = useNavigation();
    const { data: channelData } = useFirestoreQuery(fs => fs.doc(`channels/${ params.id }`));
    const { updateDocument, state: { status: updatedChannelDataState } } = useFirestoreCrud(`channels/${ params.id }`)
    const { deleteDocument, state: { status: deletedChannelDataState } } = useFirestoreCrud(`channels/${ params.id }`)
    
    const handleChannelEdit = data => {
        updateDocument({
            channel_name: data.channelName
        })
    }
    
    const handleChannelDelete = () => {
        deleteDocument(true);
    }
    
    useEffect(() => {
        deletedChannelDataState === 'success' && navigation.navigate('inbox', { screen: 'channels' });
    }, [deletedChannelDataState])
    
    useEffect(() => {
        if (updatedChannelDataState === 'success') {
            navigation.goBack();
            Toast.show({
                text1: 'We\'ve updated the info',
                position: 'bottom'
            });
        }
    }, [updatedChannelDataState])
    
    if (!channelData) return <LoadingScreen />
    return (
        <Screen ignore>
            <Wrapper>
                <AvoidKeyboard>
                    <Form
                        initialValues={{ channelName: channelData.channel_name }}
                        onSubmit={handleChannelEdit}
                    >
                        <FormField 
                            name="channelName"
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="email-address"
                            placeholder="Channel name"
                            textContextType="emailAddress"
                        />
                        <FormSubmit title="Save changes"/>
                    </Form>
                    <AppButton theme="opaque" title="Delete channel" style={{ marginTop: rem(2) }} onPress={() => Alert.alert(
                        'Delete channel',
                        'This action can\'t be undone.',
                        [
                            { text: 'Confirm delete', onPress: handleChannelDelete },
                            { text: 'Not shure', onPress: () => Linking.openURL('https://www.youtube.com/watch?v=dQw4w9WgXcQy') },
                            { text: 'Cancel', onPress: () => null }
                        ], { cancelable: true }
                    )} />
                </AvoidKeyboard>
            </Wrapper>
        </Screen>
    );
}

export default ChannelEditScreen;