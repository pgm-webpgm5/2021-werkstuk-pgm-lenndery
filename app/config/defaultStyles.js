import { vw } from '../utils'

export const defaultFontSize = 16;

export const colors = {
    primary: '#A31E2D',
    primaryBright: '#DC0000',
    secondary: '',
    black: 'black',
    background: '#292929',
    
    defaultText: 'white',
    
    // light mode
    grey200: "#e9ecef",
    grey300: "#dee2e6",
    grey400: "#ced4da",
    grey500: "#adb5bd",
    grey600: "#6c757d",
    grey700: "#495057",
    grey800: "#343a40",
    grey900: "#212529",
    
    // dark mode
    dark200: '#747878',
    dark300: '#3C3E3E',
    dark400: '#333333',
    dark500: '#292929',
    dark600: '#211c1c',
    dark700: '#1f1f1f',
    dark800: '#191919',
}

export const screenHeader = {
    headerTitleStyle: {
        color: 'white',
    },
    headerStyle: {
        backgroundColor: colors.dark700
    },
    headerBackButtonStyle: {
        backgroundColor: 'red'
    },
    headerTintColor: 'white',
}

export const logo = {
    height: 50,
    width: vw(50),
}

export const textCenter = {
    textAlign: 'center'
}

/**
 * Create a round element. The dimensions and borderRadius depend on the given parameter
 * @param {number} size The actual dimensions of the component
 */
export const circular = (size) => {
    return {
        width: size,
        height: size,
        borderRadius: size
    }
}

/**
 * 
 * @param {number} borderTopLeftRadius 
 * @param {number} borderTopRightRadius 
 * @param {number} borderBottomRightRadius 
 * @param {number} borderBottomLeftRadius 
 */
export const borderRadius = (borderTopLeftRadius, borderTopRightRadius, borderBottomRightRadius, borderBottomLeftRadius) => {
    return {
        borderTopLeftRadius: borderTopLeftRadius,
        borderTopRightRadius: borderTopRightRadius,
        borderBottomRightRadius: borderBottomRightRadius,
        borderBottomLeftRadius: borderBottomLeftRadius
    }
}

/**
 * Shorthand for creating a border
 * @param {number} borderWidth The width of the border
 * @param {string} borderStyle The style of the border
 * @param {string} borderColor The color of the border
 */
export const border = (borderWidth = 0, borderStyle = 'solid', borderColor = 'black') => {
    return {
        borderWidth: borderWidth,
        borderStyle: borderStyle,
        borderColor: borderColor
    }
}