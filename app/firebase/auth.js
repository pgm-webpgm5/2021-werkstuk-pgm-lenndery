import React, { createContext, useContext, useState, useEffect } from "react";
import { AppState } from "react-native";
import { auth, firestore } from "./firebase";
import { useFirestoreCrud } from "./useFirestoreCrud.js";
import { useFirestoreQuery } from "./useFirestoreQuery.js";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [ user, setUser ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const { setDocumentByID, state } = useFirestoreCrud();
    
    /**
     * Save a user in the storage
     * @param {string} email 
     * @param {string} password 
     */
    const login = (email, password) => auth
        .signInWithEmailAndPassword(email, password);
    
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
                last_activity: new Date()
            }, `users/${uid}`)
            // resp.user.updateProfile({
            //     displayName: username
            // })
        })
        
    /**
     * Remove the saved user from the storage
     */
    /**
     * TODO: set activity to logged_out
     */
    const logout = () => auth.signOut()
    
    /**
     * TODO: set activity to active + last_activity
     */
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async registeredUser => {
            if (registeredUser) {
                const data = await firestore.doc(`users/${registeredUser.uid}`).get();
                setUser({ 
                    ...registeredUser,
                    ...(data.data() || {} ),
                });
                setLoading(false)
            }
            else setUser(null)
        })
        return () => unsubscribe();
    }, [])
    
    const value = {
        user,
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