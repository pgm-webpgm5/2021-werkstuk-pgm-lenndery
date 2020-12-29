import React, { useReducer, useEffect, useState } from 'react';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import fileExtension from 'file-extension';

import { storage } from './firebase';

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
 * Get or upload files from Firebase storage
 * @param {string} storagePath The path that is used by Firebase to store the file
 */
export const useFirebaseStorage = (storagePath = '') => {
    const initialState = { 
        status: "idle", 
        data: undefined, 
        error: undefined 
    }
    
    const [ state, dispatch ] = useReducer(reducer, initialState);
    const [ returnedState, setReturnedState ] = useState({ type: "idle" })
    
    /**
     * Get the downloadURL of a, on Firebase stored, file
     * @param {string} storagePath Overrides the global storagePath
     * @returns A url to the file
     */
    const getDownloadURL = async (path = storagePath) => {
        dispatch({ type: "loading" });
        
        storage.ref(path).getDownloadURL()
            .then(uri => dispatch({ type: "success", payload: uri }))
            .catch(err => dispatch({ type: "error", payload: err }))
    }
    
    /**
     * 
     * @param {string} localFilePath The path to the file on the device
     * @param {string} fileName Choose a custom name for the file that is uploaded, this overrides the random Id
     * @param {string} path Overrides the global storagePath. When uploading files, do exclude the filename.
     */
    const uploadFile = async (localFilePath, fileName, path = storagePath) => {
        dispatch({ type: "loading" });
        
        try {
            // get the extension based on filepath
            const ext = fileExtension(localFilePath)
            
            // fetch file
            const response = await fetch(localFilePath);
            
            // get mime-type of file
            const mimeType = await response.headers.map['content-type'];
            
            // get blob from fetch response
            const blob = await response.blob();
            
            // create Storage reference
            const rootStorageRef = storage.ref();
            
            // compose storagePath, based on the chosen path, a random Id and the file extension
            const composedPath = path + `/${!fileName ? uuidv4() : fileName}` + `.${ext}`;
            
            // create reference to storagePath
            const upload = rootStorageRef.child(composedPath).put(blob, { 
                contentType: mimeType,
            });
            
            // change returned state based on upload status
            upload.on('state_changed', snapshot => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                
                dispatch({ type: "success", payload: {
                    progress: progress,
                    ext: ext,
                    path: composedPath
                }});  
                 
                switch (snapshot.state) {
                    case storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                }
            }, err => {
                dispatch({ type: "error", payload: err });
            }, async success => {
                const uri = await upload.snapshot.ref.getDownloadURL()
                dispatch({ type: "success", payload: {
                    progress: 100,
                    ext: ext,
                    path: composedPath,
                    uri: await uri
                }})
                dispatch({ type: "idle" });
            })         
        } catch (err) {
            dispatch({ type: "error", payload: returnedState });
        }
    }
    
    return { state, getDownloadURL, uploadFile }
}