import React from 'react';
import { Image, ImageBackground, StyleSheet, View, Text, FlatList, SafeAreaView, StatusBar, Platform } from 'react-native';
import { colors } from '../config/defaultStyles';
import { rem } from '../utils';

console.log(colors)

function Screen ({ children, title, backgroundColor = colors.background, style }) {
    return (
        <SafeAreaView style={[styles.screen, style]}>
            <View>
                { children }
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        width: '100%',
        height: '100%',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    title: {
        width: '100%',
        padding: rem(1),
    }
})

export default Screen