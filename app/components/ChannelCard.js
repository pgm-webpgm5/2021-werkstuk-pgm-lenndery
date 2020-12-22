import React from 'react';
import { TouchableWithoutFeedback, View, StyleSheet, Image, Text } from 'react-native';
import { AppText, AvatarBadge, H4, Strong } from '.';
import { colors, circular } from '../config/defaultStyles';
import { rem } from '../utils';

function ChannelCard(props) {
    return (
        <TouchableWithoutFeedback>
            <View style={ styles.container }>
                <AvatarBadge style={{ marginRight: rem(1.4) }} badgeContent="3" uri="https://img1.looper.com/img/gallery/the-entire-story-of-the-office-finally-explained/intro-1565722485.jpg" />
                <View style={ styles.channelInfo }>
                    <H4 style={ styles.channelName }># the-office-fanclub</H4>
                    <AppText style={ styles.channelLastMessagePreview }><Strong>{'You'}:</Strong> {('If I don\'t have some cake soon, I might die').substring(0, 30)}...</AppText>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: colors.dark500,
        padding: rem(1)
    },
    channelInfo: {
        flex: 1,
        justifyContent: 'center'
    },
    channelName: {
        fontWeight: 'bold',
        color: colors.grey200,
    },
    channelLastMessagePreview: {
        color: colors.grey200,
        opacity: .6
    }
})

export default ChannelCard;