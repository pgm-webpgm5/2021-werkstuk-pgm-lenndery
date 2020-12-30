import React from 'react';
import { Image, ImageBackground, StyleSheet, View, Text, FlatList, SafeAreaView, StatusBar, Platform, KeyboardAvoidingView } from 'react-native';
import { colors } from '../config/defaultStyles';
import { useKeyboardHeight } from '../hooks';
import { rem } from '../utils';

function Screen ({ children, title, backgroundColor = colors.background, style, ignore }) {
    return (
        <SafeAreaView style={[styles.screen, style, ignore && styles.ignore ]}>
            { children }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        height: '100%',
        width: '100%',
        padding: rem(2),
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: colors.background,
    },
    title: {
        width: '100%',
        padding: rem(1),
    },
    ignore: {
        padding: rem(0),
        paddingTop: 0
    }
})

export default Screen