import React, { useContext, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Yup from 'yup';

import { Label, Screen, H4, Form, FormField, Wrapper, H3, H5, FormSubmit, AppButton, FormError } from '../components';
import { LogoIcon } from '../assets'
import { rem, vh, vw } from '../utils';
import { AuthContext } from '../contexts';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase/firebase';
import { useAuth } from '../firebase/auth';

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label('Email'),
    password: Yup.string().required().min(4).label('Password'),
});

function LoginScreen(props) {
    const navigation = useNavigation()
    const { login } = useAuth()
    
    // const handleLogin = async data => {
    //     storeUser(data)
    //     setUser(data)
    //     return {status: 'done'}
    // }
    
    const handleLogin = ({email, password}) => {
        login(email, password);
    }
     
    return (
        <>
            <Screen>
                <Wrapper style={ styles.wrapper }> 
                    {/* <LogoLight style={[ logo, styles.logo, { width: vw(40)} ]}/> */}
                    <LogoIcon style={[ styles.logo ]}/>
                    <H3 style={{ fontWeight: 'bold' }}>Welcome back</H3>
                    <H3>Let's sign you in.</H3>
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
                            keyboardType="email-address"
                            placeholder="Password"
                            textContextType="password"
                            secureTextEntry
                        />
                        <FormSubmit title="Next" />
                    </Form>
                    <AppButton theme="simple" style={{ marginTop: rem(1), alignSelf: 'center' }} title="I'm new here" onPress={() => navigation.navigate('register') }/>
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