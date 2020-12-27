import React, { useEffect, useState } from 'react';
import Toast, { BaseToast } from 'react-native-toast-message';
import { rem } from '../utils';
import { colors, borderRadius } from './defaultStyles';

const toastBorderRadius = 10;
export const toastConfig = {
    success: ({ text1, text2, ...rest }) => (
        <BaseToast
            style={{ 
                borderLeftWidth: 0,
                backgroundColor: null
            }}
            contentContainerStyle={{ 
                backgroundColor: colors.dark200, 
                paddingHorizontal: rem(1),
                ...borderRadius(toastBorderRadius, 0, 0, toastBorderRadius),
            }}
            leadingIconContainerStyle={{
                ...borderRadius(toastBorderRadius, 0, 0, toastBorderRadius),
            }}
            trailingIconContainerStyle={{
                backgroundColor: colors.dark200, 
                ...borderRadius(0, toastBorderRadius, toastBorderRadius, 0)
            }}
            text1Style={{
                fontSize: rem(1),
                fontWeight: 'semibold',
                color: 'white'
            }}
            text1={ text1 }
            text2={ text2 }
        />
    )
};