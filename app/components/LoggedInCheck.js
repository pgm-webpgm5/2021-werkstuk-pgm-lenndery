import React, { useContext } from 'react';
import { Text} from 'react-native';
import { AuthContext } from '../contexts';
import { useAuth } from '../firebase/auth';

function LoggedInCheck({ is, isNot }) {
    const { user, noUserFound } = useAuth()
    // const user = true;
    
    if (!noUserFound) return is;
    if (noUserFound) return isNot;
}

export default LoggedInCheck;