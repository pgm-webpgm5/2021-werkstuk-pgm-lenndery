import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { KeyboardAvoidingView, Platform } from 'react-native';

import { Screen, Wrapper, Form, FormField, H3, FormSubmit, AppButton } from '../components';
import { useAuth } from '../firebase/auth';
import { rem } from '../utils';
import { useFirestoreCrud } from '../firebase/useFirestoreCrud';
import { auth } from '../firebase/firebase';

function UserEditScreen(props) {
    const navigation = useNavigation()
    const { user } = useAuth()
    const { updateDocument: updateUserdata, state: { status: userdataUpdateStatus } } = useFirestoreCrud(`users/${user.uid}`)
    
    const handleSubmit = async data => {     
        navigation.goBack();  
        
        try {
            // update sensitive data if edited
            data.password && await updatePassword(data.password)
            data.email && await updateEmail(data.email)
            
            // remove sensitive data
            delete data.email
            delete data.password
            
            await updateUserdata(data)
            Toast.show({
                text1: 'We\'ve updated you\'re profile',
                position: 'bottom'
            });
        } catch (err) {
            Toast.show({
                text1: 'Something went wrong, try logging off and on again',
                position: 'bottom'
            });
        }
    }
    
    const updatePassword = async password => {
        await auth.currentUser.updatePassword(password);
    }
    
    const updateEmail = async email => {
        await auth.currentUser.updateEmail(email);
    }
    
    const initialValues = {
        email: user.email,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        address: user.address,
        zip: user.zip,
    }
    
    return (
        <Screen>
            <Wrapper>
                <H3 style={{ marginBottom: rem(2) }}>Edit profile</H3>
                <Form
                    onSubmit={handleSubmit}
                    initialValues={ initialValues }
                >
                    <FormField
                        name="username"
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="Username"
                        textContextType="username"
                    />
                    <FormField
                        name="email"
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="email-address"
                        placeholder="Email"
                        textContextType="emailAddress"
                    />
                    <FormField 
                        name="password"
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="default"
                        placeholder="Password"
                        textContextType="password"
                        secureTextEntry
                    />
                    <FormField
                        name="firstname"
                        autoCapitalize="words"
                        autoCorrect={false}
                        placeholder="Firstname"
                        textContextType="firstname"
                    />
                    <FormField
                        name="lastname"
                        autoCapitalize="words"
                        autoCorrect={false}
                        placeholder="Firstname"
                        textContextType="lastname"
                    />
                    <FormField
                        name="address"
                        autoCapitalize="none"
                        autoCorrect={true}
                        placeholder="Address"
                        textContextType="streetAddressLine1"
                    />
                    <FormField
                        name="zip"
                        autoCapitalize="none"
                        autoCorrect={true}
                        placeholder="Zipcode"
                        textContextType="postalCode"
                    />
                    <FormSubmit title="Save changes" />
                    <AppButton theme="simple" style={{ marginTop: rem(.5) }} labelStyle={{ color: 'white' }} title="Discard changes" onPress={() => navigation.goBack()} />
                </Form>
            </Wrapper>
        </Screen>
    );
}

export default UserEditScreen;