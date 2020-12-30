import React, { useReducer, useEffect, useState } from 'react';
import { firestore } from './firebase';

const reducer = (state, action) => {
    switch (action.type) {
        case "loading":
        return { status: "loading", data: undefined, error: undefined };
        case "success":
        return { status: "success", data: action.payload, error: undefined };
        case "error":
        return { status: "error", data: undefined, error: action.payload };
        default:
        throw new Error("invalid action");
    }
}

/**
 * 
 * @param {object} query fs => fs.doc(documentpath)[.collection('subcollection')]
 */
export const useFirestoreQuery = (defaultQuery) => {   
    const initialState = { 
        status: "idle", 
        data: undefined, 
        error: undefined 
    }
    
    const [ state, dispatch ] = useReducer(reducer, initialState);
    
    const fetchQuery = (query = defaultQuery) => {
        dispatch({ type: "loading" });
        
        // Subscribe to query with onSnapshot
        // Will unsubscribe on cleanup since this returns an unsubscribe function
        // Return query as function with firestore object to avoid extra import of firestore object
        return query(firestore).onSnapshot(
            response => {
                // Get data for collection or doc
                const data = response.docs
                ? getCollectionData(response)
                : getDocData(response);
                
                dispatch({ type: "success", payload: data });
            },
            error => {
                dispatch({ type: "error", payload: error });
            }
        );
            
    }
    
    useEffect(() => {
        fetchQuery();
    }, [])
    
    const refetch = (query = defaultQuery) => {
        fetchQuery(query)
    }
    
    return { ...state, refetch }
}

export const useLazyFirestoreQuery = (rootQuery) => {
    // const [ query, setQuery ] = useState();
    
    const initialState = { 
        status: "idle", 
        data: undefined, 
        error: undefined 
    }
    
    const [state, dispatch] = useReducer(reducer, initialState);
    
    const fetchQuery = (query = rootQuery) => {
        dispatch({ type: "loading" });
        
        // Subscribe to query with onSnapshot
        // Will unsubscribe on cleanup since this returns an unsubscribe function
        // Return query as function with firestore object to avoid extra import of firestore object
        return query(firestore).onSnapshot(
            response => {
                // Get data for collection or doc
                const data = response.docs
                ? getCollectionData(response)
                : getDocData(response);
                
                dispatch({ type: "success", payload: data });
            },
            error => {
                dispatch({ type: "error", payload: error });
            }
        );
    }
    
    return { ...state, fetchQuery }
}

// Get doc data and merge doc.id
const getDocData = (doc) => {
  return doc.exists === true ? { id: doc.id, ...doc.data() } : null;
}

// Get array of doc data from collection
const getCollectionData = (collection) => {
  return collection.docs.map(getDocData);
}