import React, { useRef } from 'react';
import { StyleSheet } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ChannelCard from './ChannelCard';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../config/defaultStyles';
import { rem } from '../utils';
import { useFirestoreCrud } from '../firebase/useFirestoreCrud';
import { useAuth } from '../firebase/auth';
import { firebase, firestore } from '../firebase/firebase';

function PinChannel({ item }) {
    const { user } = useAuth();
    const navigation = useNavigation();
    const { updateDocument: updatePins } = useFirestoreCrud(`users/${ user.uid }`);
    
    const ref = useRef();
    const channelIsPinned = user.pinnedChannels.find(id => id === item.id) ? true : false;
    
    return (
        <Swipeable 
            ref={ ref }
            containerStyle={ styles.ChannelCardSwipe } 
            overshootFriction={ 8 } 
            friction={ 1 } 
            overshootRight={ false }
            renderRightActions={() =>
                <MaterialCommunityIcons name={ channelIsPinned ? 'pin-off-outline' : 'pin' } size={24} color="white" style={[ styles.pinIcon ]}/>
            }
            onSwipeableRightOpen={() => {
                ref.current.close()
                updatePins({
                    pinnedChannels: firebase.firestore.FieldValue[!channelIsPinned ? 'arrayUnion' : 'arrayRemove'](item.id)
                })
            }}
        >
            <ChannelCard data={ item } isPinned={ channelIsPinned } onPress={() => navigation.navigate('channelMessages', { 
                id: item.id,
                channel_name: item.channel_name
            })}/>
        </Swipeable>
    );
}

const styles = StyleSheet.create({
    ChannelCardSwipe: {
        backgroundColor: colors.dark700,
    },
    pinIcon: {
        alignSelf: 'center',
        padding: rem(1.4)
    }
})

export default PinChannel;