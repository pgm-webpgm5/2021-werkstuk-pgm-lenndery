import React, { useContext, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';

import { Label, Screen, Form, FormField, Wrapper, FormSubmit, AppButton, FormError, AppTitle } from '../components';
import { LogoIcon } from '../assets'
import { rem, vh, vw } from '../utils';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../firebase/auth';


const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label('Email'),
    password: Yup.string().required().min(4).label('Password'),
});

function LoginScreen(props) {
    const navigation = useNavigation()
    const { login, noUserFound } = useAuth()
    
    const handleLogin = ({ email, password }) => {
        const { error } = login(email, password);
        if (error) Toast.show({
            text1: 'We couldn\'t find this user',
            position: 'bottom'
        });
    }
     
    return (
        <>
            <Screen>
                <Wrapper style={[ styles.wrapper, { padding: 0 }]}> 
                    {/* <LogoLight style={[ logo, styles.logo, { width: vw(40)} ]}/> */}
                    <LogoIcon style={[ styles.logo ]}/>
                    <AppTitle h="3" style={{ fontWeight: 'bold' }}>Welcome back</AppTitle>
                    <AppTitle h="3">Let's sign you in.</AppTitle>
                    <Form
                        style={{ marginTop: rem(4) }}
                        onSubmit={ handleLogin }
                        validationSchema={ validationSchema }
                    >
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
                        <FormSubmit title="Next" />
                    </Form>
                    <AppButton theme="secondary" style={{ marginTop: rem(2) }} title="I'm new here" materialIcon="navigate-next" onPress={() => navigation.navigate('register') }/>
                </Wrapper>
            </Screen>
        </>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        // flex: 1,
        height: vh(80),
        justifyContent: 'center',
    },
    logo: {
        alignSelf: 'flex-start',
        height: rem(2),
        width: rem(2.4),
        marginBottom: rem(2)
    }
})

export default LoginScreen;