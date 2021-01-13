import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';

import { Screen, Wrapper, Form, FormField, FormSubmit, AppButton, AvoidKeyboard, AppTitle } from '../components';
import { useAuth } from '../firebase/auth';
import { rem } from '../utils';
import { useFirestoreCrud } from '../firebase/useFirestoreCrud';
import { auth } from '../firebase/firebase';

const validationSchema = Yup.object().shape({
    username: Yup.string().min(4).required().label('Username'),
    email: Yup.string().required().email().label('Email'),
    password: Yup.string().min(4).label('Password'),
    firstname: Yup.string().label('Firstname'),
    lastname: Yup.string().label('Lastname'),
    address: Yup.string().label('Address'),
    zip: Yup.number().label('Zip'),
});

function UserEditScreen(props) {
    const navigation = useNavigation()
    const { user } = useAuth()
    const { updateDocument: updateUserdata, state: { status: userdataUpdateStatus, error } } = useFirestoreCrud(`users/${user.uid}`);
    
    const removeUndefinedValues = data => {
        const keys = Object.keys(data);
        keys.map(key => {
            data[key] === undefined && delete data[key]
        })
        
        return data;
    }
    
    const handleSubmit = async data => {     
        // navigation.goBack();         
        const checkedData = removeUndefinedValues(data);
        
        try {
            // update sensitive data if edited
            checkedData.password && await updatePassword(data.password)
            checkedData.email && await updateEmail(data.email)
            
            // remove sensitive data
            delete checkedData.email
            delete checkedData.password
                        
            await updateUserdata(checkedData)
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
    
    useEffect(() => {
        userdataUpdateStatus === 'success' && navigation.goBack()
    }, [userdataUpdateStatus])
    
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
            <AvoidKeyboard>
                <AppTitle h="3" style={{ marginVertical: rem(2) }}>Edit profile</AppTitle>
                <Form
                    onSubmit={handleSubmit}
                    initialValues={ initialValues }
                    validationSchema={ validationSchema }
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
                        keyboardType="number-pad"
                    />
                    <FormSubmit title="Save changes" />
                    <AppButton theme="simple" style={{ marginTop: rem(.5) }} labelStyle={{ color: 'white' }} title="Discard changes" onPress={() => navigation.goBack()} />
                </Form>
            </AvoidKeyboard>
        </Screen>
    );
}

export default UserEditScreen;