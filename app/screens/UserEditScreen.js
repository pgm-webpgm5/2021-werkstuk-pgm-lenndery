import React from 'react';
import { Screen, Wrapper, Form, FormField, H3 } from '../components';
import FormSubmit from '../components/AppButton';
import { useAuth } from '../firebase/auth';
import { rem } from '../utils';

function UserEditScreen(props) {
    const { user } = useAuth()
    
    const handleSubmit = data => {
        
    }
    
    console.log({ user })
    
    const initialValues = {
        email: user.email,
        username: user.username
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
                    <FormSubmit title="Save changes" />
                    <FormSubmit theme="simple" labelStyle={{ color: 'white' }} title="Discard changes" />
                </Form>
            </Wrapper>
        </Screen>
    );
}

export default UserEditScreen;