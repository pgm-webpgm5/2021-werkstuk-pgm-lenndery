import React, { useEffect, useState } from 'react';
import { TouchableHighlight, Image, View, StyleSheet, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import dayjs from 'dayjs'

import { colors, circular, border, borderRadius } from '../config/defaultStyles';
import { rem } from '../utils';
import { storage } from '../firebase/firebase'
import {  } from 'react/cjs/react.development';

function AvatarBadge({ uri, badgeContent = '', status = 'background', lastActive = 0, style = {} }) { 
    const [ lastActiveMinutes, setLastActiveMinutes ] = useState(0);
    
    const calculateLastActiveMinutes = () => {
        const mint = dayjs(lastActive*1000)
        return mint.diff(dayjs(), 'minute')*-1
    }
    
    useEffect(() => {
        const result = calculateLastActiveMinutes()
        setLastActiveMinutes(result);
        
        const unsubscribe = setInterval(() => {
            const result = calculateLastActiveMinutes()
            setLastActiveMinutes(result);
        }, 2000);
        
        return () => clearInterval(unsubscribe);
    }, [])

    return (
        <TouchableHighlight>
            <View style={[ style ]}>
                {
                    uri ? 
                    <Image style={styles.avatar} source={{ uri: uri }} /> :
                    <View style={ styles.avatarNotFound }>
                        <MaterialCommunityIcons name="account" size={rem(2)} color="white" style={{ transform: [{ translateY: -2 }] }} />
                    </View>
                }
                { lastActiveMinutes < 30 && <View style={[ styles.badge, badgeStyle[status] ]}>
                    {status !== 'active' && <Text style={[ styles.badgeContent, badgeTextStyle[status] ]}>
                        { lastActiveMinutes == 0 ? 1 : lastActiveMinutes }m
                    </Text>}
                </View> }
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
        top: rem(4) - 25,
        right: -4,
        alignSelf: 'center',
        backgroundColor: '#67C45D',
        ...border(4, 'solid', colors.dark500),
    },
    badgeContent: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})

const badgeStyle = StyleSheet.create({
    active: {
        ...circular(25)
    },
    background: {
        backgroundColor: '#3C583D',
        top: rem(4) - 25,
        right: -15,
        paddingHorizontal: rem(.4),
        paddingVertical: rem(.1),
        borderRadius: 1000,
        // borderBottomLeftRadius: 0
    },
    logged_out: {
        backgroundColor: '#3C583D',
        top: rem(4) - 25,
        right: -15,
        paddingHorizontal: rem(.4),
        paddingVertical: rem(.1),
        borderRadius: 1000,
        // borderBottomLeftRadius: 0
    }
})

const badgeTextStyle = StyleSheet.create({
    active: {
    },
    background: {
        color: '#67C45D'
    },
    logged_out: {
        color: '#67C45D'
    }
})

export default AvatarBadge;