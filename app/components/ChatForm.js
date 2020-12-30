import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Keyboard } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Yup from 'yup';

import { useAuth } from '../firebase/auth';
import { useFirestoreCrud } from '../firebase/useFirestoreCrud';
import FormSubmit from './Form/FormSubmit';
import Form from './Form/Form';
import FormField from './Form/FormField';
import { rem, selectImage } from '../utils';
import { colors } from '../config/defaultStyles';
import { useFirebaseStorage } from '../firebase/useFirebaseStorage';

function ChatForm({ messagePath, containerStyle }) {
    const { user } = useAuth();
    const { addDocument } = useFirestoreCrud(messagePath);
    const [ uploadedImagePath, setUploadedImagePath ] = useState()
    const { uploadFile, state: { status, data: imageUploadData, error } } = useFirebaseStorage('attachments')
    
    const handleMessageSend = (data, { resetForm }) => {
        resetForm({});
        addDocument({
            content: data.message,
            sender: user.uid,
            sender_name: user.username,
            timestamp: new Date(),
            type: 'generic'
        })
    }
    
    const validationSchema = Yup.object().shape({
        message: Yup.string().min(1).required().label('Message')
    })
    
    const handlePhotoSend = async () => {
        const uri = await selectImage();
        uploadFile(await uri)
    }
    
    useEffect(() => {
        imageUploadData?.path && setUploadedImagePath(imageUploadData.path)
    }, [imageUploadData])
    
    useEffect(() => {
        uploadedImagePath && addDocument({
            content: uploadedImagePath,
            sender: user.uid,
            sender_name: user.username,
            timestamp: new Date(),
            type: 'photo'
        })
    }, [uploadedImagePath])
    
    return (
        <View style={ styles.wrapper }> 
            <TouchableOpacity onPress={handlePhotoSend}>
                <MaterialCommunityIcons name="image-multiple" size={ rem(1.6) } color={ colors.grey300 } />
            </TouchableOpacity>
            <Form
                onSubmit={ handleMessageSend }
                style={[ styles.form, containerStyle ]}
                validationSchema={ validationSchema }
            >
                <FormField
                    name="message"
                    autoCorrect={ true }
                    keyboardType="default"
                    placeholder="Say something ..."
                    containerStyle={ styles.formField }
                    resetOnSend
                />
                <FormSubmit style={ styles.sendButton }>
                    <MaterialCommunityIcons name="send" size={ rem(1.7) } color={ colors.grey300 } />
                </FormSubmit>
            </Form>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: rem(1)
    },
    form: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        flex: 1
    },
    formField: {
        flex: 1,
        marginRight: rem(1)
    },
    sendButton: {
        alignSelf: 'center',
        marginBottom: rem(1),
        padding: 0,
        paddingHorizontal: 0,
        backgroundColor: null
    }
})

export default ChatForm;