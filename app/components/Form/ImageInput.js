import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableWithoutFeedback, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { circular, colors } from '../../config/defaultStyles';
import { rem } from '../../utils';

function ImageInput({ sourceUri, onChangeImage = () => null, onDelete = () => null, style }) {
    const requestPermission = async () => {
        // const result = Permissions.askAsync(Permissions.MEDIA_LIBRARY);
        const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (!granted) alert('Need to enablle permission for camera roll')
    }
    
    useEffect(() => {
        requestPermission();
    }, [])
    
    const handlePress = () => {
        if(!sourceUri) selectImage()
        if(sourceUri) Alert.alert(
            'Avatar', 
            'Do you want to change your avatar?',
            [
                {text: 'Delete avatar', onPress: () => onChangeImage(null)},
                {text: 'Change avatar', onPress: selectImage}
            ], { cancelable: true }
        )
    }
    
    const selectImage = async () => {
        try {
            const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: .7
            });
            if(!cancelled) onChangeImage(uri);
        } catch (err) {
            console.log('Error reading image', err)
        }
    }
    
    return (
        <TouchableWithoutFeedback onPress={handlePress}>
            <View style={[ styles.container, style ]}>
                {
                    sourceUri ? 
                    <Image source={{ uri: sourceUri }} style={ styles.image } /> :
                    <MaterialCommunityIcons name="camera-image" size={rem(2.2)} color="white" />
                }
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        ...circular(100),
        backgroundColor: colors.dark700,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%',
    }
})

export default ImageInput;