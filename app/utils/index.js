import { Dimensions } from 'react-native';
import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'

dayjs.extend(calendar)

import { defaultFontSize } from '../config/defaultStyles';

/**
 * 
 * @param {number} fontSize Size unite based on the default font size
 */
export const rem = (fontSize) => {
    return fontSize * defaultFontSize
}

/**
 * 
 * @param {number} percent Size unit based on screen width
 */
export const vw = (percent) => {
    return (Dimensions.get('window').width / 100) * percent
}

/**
 * 
 * @param {number} percent Size unit based on screen height 
 */
export const vh = (percent) => {
    return (Dimensions.get('window').height / 100) * percent
}

/**
 * 
 * @param {number|string} date A date as milliseconds or a string, to convert
 */
export const messageRecievedDate = (date) => dayjs(date).calendar(null, {
    sameDay: '[Today at] h:mm', // The same day ( Today at 2:30 AM )
    lastDay: '[Yesterday] dd h:mm', // The day before ( Yesterday at 2:30 AM )
    lastWeek: 'dd h:mm', // Last week ( Last Monday at 2:30 AM )
    sameElse: 'DD MMM h:mm' // Everything else ( 7/10/2011 )
})