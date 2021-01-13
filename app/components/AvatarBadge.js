import React from 'react';
import { TouchableHighlight, Image, View, StyleSheet, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { colors, circular, border } from '../config/defaultStyles';
import { rem } from '../utils';
import { storage } from '../firebase/firebase'

function AvatarBadge({ uri, badgeContent = 0, style = {} }) { 
    const maxBadgeContentCount = 10;
    
    return (
        <TouchableHighlight>
            <View style={[ style ]}>
                {
                    uri ? 
                    <Image style={styles.avatar} source={{ uri: uri }} /> :
                    <View style={ styles.avatarNotFound }>
                        <MaterialCommunityIcons name="account-group" size={rem(2)} color="white" style={{ transform: [{ translateY: -3 }] }} />
                    </View>
                }
                {badgeContent > 2 && <View style={ styles.badge }><Text style={ styles.badgeContent }>{ badgeContent > maxBadgeContentCount ? `${maxBadgeContentCount} +` : badgeContent }</Text></View>}
            </View>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    avatar: {
        ...circular(rem(4))
    },
    avatarNotFound: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.grey700,
        ...circular(rem(4)),
    },
    badge: {
        position: 'absolute',
        top: -6,
        right: -10,
        alignSelf: 'center',
        minWidth: 31,
        height: 30,
        paddingHorizontal: rem(.4),
        paddingVertical: rem(.1),
        backgroundColor: colors.primary,
        borderRadius: 1000,
        ...border(4, 'solid', colors.dark500)
    },
    badgeContent: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})

export default AvatarBadge;