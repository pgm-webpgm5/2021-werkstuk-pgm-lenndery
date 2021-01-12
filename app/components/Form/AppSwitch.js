import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Switch } from 'react-native';

import { AppText } from '..';
import { colors } from '../../config/defaultStyles';
import { rem } from '../../utils';

function AppSwitch({ label, onValueChange = () => null, defaultState = true }) {
    const [ switchState, setSwitchState ] = useState(defaultState);
    
    useEffect(() => {
        onValueChange(switchState)
    }, [switchState])
    
    return (
        <View style={ styles.switchContainer }>
            <AppText>{ label }</AppText>
            <Switch trackColor={{
                true: "#A31E2D30",
                false: colors.dark700,
            }} thumbColor={
                switchState ? colors.primary : colors.dark300
            } value={ switchState } onValueChange={() => setSwitchState(!switchState)}/>
        </View>
    );
}

const styles = StyleSheet.create({
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: rem(1)
    }
})

export default AppSwitch;