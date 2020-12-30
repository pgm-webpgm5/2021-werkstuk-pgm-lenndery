import React from 'react';
import { View, StyleSheet, TouchableOpacity} from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { rem } from '../utils';
import { colors } from '../config/defaultStyles';
import { useNavigation } from '@react-navigation/native';
import { useFirestoreQuery } from '../firebase/useFirestoreQuery';
import { useAuth } from '../firebase/auth';

function ChannelEditButton({ onPress, channelId }) {
    const { user } = useAuth();
    const { data } = useFirestoreQuery(fs => fs.doc(`channels/${channelId}`));
    
    const currentUserIsAdmin = data?.admin == user.uid;
    
    return (
        <>
            { currentUserIsAdmin && <TouchableOpacity onPress={ onPress }>
                <MaterialIcons name="admin-panel-settings" size={ rem(1.7) } color={ colors.grey400 } />
            </TouchableOpacity> }
        </>
    );
}

export default ChannelEditButton;