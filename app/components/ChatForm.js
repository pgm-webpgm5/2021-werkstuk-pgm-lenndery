import React, { useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useAuth } from '../firebase/auth';
import { useFirestoreCrud } from '../firebase/useFirestoreCrud';
import FormSubmit from './Form/FormSubmit';
import Form from './Form/Form';
import FormField from './Form/FormField';
import { rem } from '../utils';
import { colors } from '../config/defaultStyles';

function ChatForm({ messagePath, containerStyle }) {
    const { user } = useAuth();
    const { state, deleteDocument, addDocument } = useFirestoreCrud(messagePath);
    
    const handleMessageSend = (data) => {
        console.log(data);
        addDocument({
            content: data.message,
            sender: user.uid,
            sender_name: user.username,
            timestamp: new Date()
        })
    }
    
    return (
        <Form
            onSubmit={handleMessageSend}
            style={[ styles.form, containerStyle ]}
        >
            <FormField
                name="message"
                autoCorrect={ true }
                keyboardType="default"
                placeholder="Say something ..."
                containerStyle={ styles.formField }
            />
            <FormSubmit style={ styles.sendButton }>
                <MaterialCommunityIcons name="send" size={ rem(2) } color={ colors.grey300 } />
            </FormSubmit>
        </Form>
    );
}

const styles = StyleSheet.create({
    form: {
        flexDirection: 'row',
        alignItems: 'flex-start'
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