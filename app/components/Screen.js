import React from 'react';
import { Image, ImageBackground, StyleSheet, View, Text, FlatList, SafeAreaView, StatusBar, Platform, KeyboardAvoidingView } from 'react-native';
import { colors } from '../config/defaultStyles';
import { useKeyboardHeight } from '../hooks';
import { rem } from '../utils';

function Screen ({ children, title, backgroundColor = colors.background, style, ignore }) {
    return (
        <SafeAreaView style={[styles.screen, style, ignore && styles.ignore ]}>
                <View>
                    <KeyboardAvoidingView
                        behavior="position"
                        keyboardVerticalOffset={ Platform.OS === 'ios' ? 0 : 0 }
                    >
                            { children }
                    </KeyboardAvoidingView>
                </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        width: '100%',
        // height: '100%',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: colors.background,
    },
    title: {
        width: '100%',
        padding: rem(1),
    },
    ignore: {
        paddingTop: rem(0)
    }
})

export default Screen