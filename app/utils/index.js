import { Dimensions } from 'react-native';


export const rem = (fontSize) => {
    return fontSize * 16
}

export const vw = (percent) => {
    return (Dimensions.get('window').width / 100) * percent
}