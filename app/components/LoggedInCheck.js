import React, { useContext } from 'react';
import { Text} from 'react-native';
import { AuthContext } from '../contexts';
import { useAuth } from '../firebase/auth';

function LoggedInCheck({ is, isNot }) {
    const { user } = useAuth()
    // const user = true;
    
    if (user) return is;
    if (!user) return isNot;
}

export default LoggedInCheck;