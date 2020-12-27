import React from 'react';
import { storage } from '../firebase/firebase';

export const useAvatar = () => {
    /**
     * 
     * @param {string} path The path of the image you want to retrieve from Firebase
     * @returns The downloadUrl from firebase
     */
    const getAvatarUri = async path => {
        try {
            const uri = await storage.ref(path).getDownloadURL()
            return await uri;
        } catch (err) {
            return null
        }
    }
    
    /**
     * Handle uploading a new avatar
     * @param {string} localPath The path that is returned from the filepicker
     * @param {string} storagePath The path where your file will be stored in Firebase
     * @returns The upload instance that is returned by firebase
     */
    const uploadAvatar = async (localPath, storagePath) => {
        try {
            const fileResponse = await fetch(localPath);
            const fileBlob = await fileResponse.blob();
            
            const metadata = {
                contentType: 'image/jpeg'
            };
            
            const rootStorageRef = storage.ref();
            const imageRef = rootStorageRef.child(storagePath);
            const upload = await imageRef.put(fileBlob, metadata);
            
            return { status: 'success', data: upload}
        } catch (error) {
            return { status: 'error'}
        }
    }
    
    return { getAvatarUri, uploadAvatar }
}