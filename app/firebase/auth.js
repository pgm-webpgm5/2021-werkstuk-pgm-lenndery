import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, firestore } from "./firebase";

import { useFirestoreCrud } from "./useFirestoreCrud.js";
import { useFirestoreQuery } from "./useFirestoreQuery.js";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [ user, setUser ] = useState(null);
    const [ noUserFound, setNoUserFound ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const { setDocumentByID, state, updateDocument } = useFirestoreCrud();
    
    /**
     * Save a user in the storage
     * @param {string} email 
     * @param {string} password 
     */
    const login = (email, password) => {
        try {
            auth.signInWithEmailAndPassword(email, password);
        } catch (error) {
            console.log('LOGIN ERROR', error)
            return { error };
        }
    }
    
    /**
     * Create a new user
     * @param {string} username 
     * @param {string} email 
     * @param {string} password 
     */
    const register = (username, email, password) => auth
        .createUserWithEmailAndPassword(email, password)
        .then(resp => {
            const uid = resp.user.uid;
            setDocumentByID({
                username: username,
                activity: 'active',
                pinnedChannels: [],
                last_activity: new Date()
            }, `users/${uid}`)
        })
        
    /**
     * Remove the saved user from the storage
     */

    const logout = () => {
        auth.signOut();
        updateDocument({
            activity: 'logged_out',
            last_activity: new Date()
        });
    }
    
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async registeredUser => {
            if (registeredUser) {
                setNoUserFound(false)
                
                // find user based on registed user id
                firestore.doc(`users/${registeredUser.uid}`).onSnapshot(snapshot => {
                    setUser({ 
                        ...registeredUser,
                        ...(snapshot.data() || {} ),
                    });
                });
                
                // set user activity on active
                updateDocument({
                    activity: 'active',
                    last_activity: new Date()
                })
                
                setLoading(false)
            }
            else {
                setUser({})
                setNoUserFound(true)
            }
        })
        return () => unsubscribe();
    }, [])
    
    const value = {
        user,
        noUserFound,
        login,
        register,
        logout
    }
    
    return (
        <AuthContext.Provider value={ value }>
            {/* { !loading && children } */}
            { children }
        </AuthContext.Provider>
    )
}