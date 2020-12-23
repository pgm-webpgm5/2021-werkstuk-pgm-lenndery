import React from 'react';
import { TouchableHighlight, Image, View, StyleSheet, Text } from 'react-native';
import { colors, circular, border } from '../config/defaultStyles';
import { rem } from '../utils';

function AvatarBadge({ uri, badgeContent = '', style = {} }) {
    return (
        <TouchableHighlight>
            <View style={[ style ]}>
                <Image style={styles.avatar} source={{ uri: uri }} />
                <View style={ styles.badge }><Text style={ styles.badgeContent }>{ badgeContent }</Text></View>
            </View>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    avatar: {
        ...circular(rem(4))
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