import React, { useReducer, useEffect } from 'react';
import { firestore } from './firebase';

const reducer = (state, action) => {
    switch (action.type) {
        case "idle":
            return { status: "idle", data: undefined, error: undefined };
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
 * @param {string} documentPath The path that will be used to execute the requested action
 */
export const useFirestoreCrud = (documentPath = '') => {
    const initialState = { 
        status: "idle",
        data: undefined, 
        error: undefined 
    }
    
    const [ state, dispatch ] = useReducer(reducer, initialState);
    
    /**
     * Remove a document in a (sub)collection
     * @param {string} id Id of the document you want to remove, if set to true (must be boolean) the function will inherit the path that was given when initializing the hook
     */
    const deleteDocument = (id) => {
        const path = id === true ? documentPath : `${documentPath}/${id}`;

        dispatch({ type: "loading" });
        
        firestore.doc(path)
        .delete()
        .then(() => dispatch({ type: "success", payload: null }))
        .catch(err => dispatch({ type: "error", payload: null }))
        
        dispatch({ type: "idle" });
    }
    
    /**
     * Add a document to a (sub)collection
     * @param {object} data The data that will be added to the document
     * @param {string} path Overrides the path that is set when calling the hook
     */
    const addDocument = async (data, path = documentPath) => {
        dispatch({ type: "loading" });
        
        try {
            const addedDocument = await firestore.collection(path).add(data)
            const response = await addedDocument.get()
            const responseData = await response.data()
            dispatch({ type: "success", payload: {...responseData, id: response.id} })
            dispatch({ type: "idle" }); 
        } catch (err) {
            dispatch({ type: "error", payload: err })
        }
    }
    
    const updateDocument = async (data, path = documentPath) => {
        dispatch({ type: "loading" });
        
        try {
            const updatedDocument = await firestore.doc(path).update(data);
            dispatch({ type: "success", payload: null })
        } catch (err) {
            dispatch({ type: "error", payload: err })
        }
        dispatch({ type: "idle" });
    }
    
    /**
     * Add a document to a (sub)collection with a custom Id
     * @param {object} data The data that will be added to the document
     * @param {string} path Overrides the path that is set when calling the hook
     */
    const setDocumentByID = (data, path = documentPath) => {
        dispatch({ type: "loading" });
        
        firestore.doc(path)
        .set(data)
        .then((createdDoc) => dispatch({ type: "success", payload: createdDoc }))
        .catch(err => dispatch({ type: "error", payload: err }))
        
        // dispatch({ type: "idle" });
    }
    
    return { state, deleteDocument, addDocument, setDocumentByID, updateDocument }
}
