import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';

import { Label, Screen, Form, FormField, Wrapper, FormSubmit, AppTitle } from '../components';
import { LogoLight, LogoIcon } from '../assets'
import { logo } from '../config/defaultStyles';
import { rem, vh, vw } from '../utils';
import { useAuth } from '../firebase/auth';

function RegisterScreen(props) {
    const { register } = useAuth();
    
    const handleRegister = ({ username, email, password }) => {
        register(username, email, password)
    }
    
    return (
        <Screen>
            <Wrapper style={[ styles.wrapper, { padding: 0 }]}> 
                {/* <LogoLight style={[ logo, styles.logo, { width: vw(40)} ]}/> */}
                <LogoIcon style={[ styles.logo ]}/>
                <AppTitle h="3" style={{ fontWeight: 'bold' }}>Hi there</AppTitle>
                <AppTitle h="3">Let's set you up.</AppTitle>
                <Form
                    style={{ marginTop: rem(4) }}
                    onSubmit={ handleRegister }
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
                        keyboardType="email-address"
                        placeholder="Password"
                        textContextType="password"
                        secureTextEntry
                    />
                    <FormSubmit title="Next" />
                </Form>
            </Wrapper>
        </Screen>
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

export default RegisterScreen;