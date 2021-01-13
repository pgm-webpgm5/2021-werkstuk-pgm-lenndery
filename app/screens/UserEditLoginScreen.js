import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';

import { Screen, Form, FormField, FormSubmit, AppButton, AvoidKeyboard, AppTitle } from '../components';
import { rem } from '../utils';
import { auth } from '../firebase/firebase';

const validationSchema = Yup.object().shape({
    password: Yup.string().min(4).required().label('New password'),
    passwordRepeat: Yup.string().min(4).required().label('Repeated new password'),
});

function UserEditScreen(props) {
    const navigation = useNavigation()
    
    const handleSubmit = async ({ password, passwordRepeat }) => {     
        console.log({ password, passwordRepeat });
        
        // check if entered passwords are equal
        // show toast if not
        if (password !== passwordRepeat) Toast.show({
            text1: 'The passwords you entered don\'t match',
            position: 'bottom'
        }) 
        
        // otherwise update password
        else {
            try {
                await updatePassword(password)
                
                navigation.goBack()
                Toast.show({
                    text1: 'We\'ve updated you\'re password',
                    position: 'bottom'
                });
            } catch (err) {
                console.log(err)
                Toast.show({
                    text1: 'Something went wrong, try logging off and on again',
                    position: 'bottom'
                });
            }
        }
    }
        
    const updatePassword = async password => {
        await auth.currentUser.updatePassword(password);
    }
    
    return (
        <Screen>
            <AvoidKeyboard>
                <AppTitle h="3" style={{ marginVertical: rem(2) }}>Change password</AppTitle>
                <Form
                    onSubmit={handleSubmit}
                    validationSchema={ validationSchema }
                >
                    <FormField 
                        name="password"
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="default"
                        placeholder="New password"
                        textContextType="password"
                        secureTextEntry
                    />
                    <FormField 
                        name="passwordRepeat"
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="default"
                        placeholder="Repeat new password"
                        textContextType="password"
                        secureTextEntry
                    />
                    <FormSubmit title="Save changes" />
                    <AppButton theme="simple" style={{ marginTop: rem(.5) }} labelStyle={{ color: 'white' }} title="Discard changes" onPress={() => navigation.goBack()} />
                </Form>
            </AvoidKeyboard>
        </Screen>
    );
}

export default UserEditScreen;