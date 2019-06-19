/**
 * @module      ./components/time/create
 */

import * as moment from 'moment';

/**
 * Creates an object with the time formatted in years, months, weeks,
 * days, hours, minutes and seconds from a moment instance.
 * 
 * @function    createTimeFormat
 * @param       {Moment} time Moment object of the time.
 * @returns     {object}
 */
const createTimeFormat = (time) => {
    return {
        years: time.format('YY'),
        months: time.format('MM'),
        weeks: time.format('WW'),
        days: time.format('DD'),
        hours: time.format('HH'),
        minutes: time.format('mm'),
        seconds: time.format('ss'),
    }
};

/**
 * Creates countdown functionality to the time element.
 * 
 * @function    createCountdown
 * @param       {String} end ISO 8601 date string to count to.
 * @returns     {void}
 */
export const createCountdown = function createCountdown(end) {

    // Check if there is already a counter running.
    if (this.interval !== null) {
        clearInterval(this.interval);
    }

    // Create moment instance for to time.
    const toMoment = moment(to);

    // Get the time elements.
    const container = this.shadowRoot.firstElementChild;
    const children = [...container.children];

    /**
     * Checks the distance to the 'to' time every second.
     * 
     * @function    count
     * @returns     {void}
     */
    const count = () => {

        // Calculate the distance.
        const now = moment();
        const distance = toMoment.diff(now);

        // Format the time.
        const time = createTimeFormat(distance);

        // Add the time to the right element.
        children.forEach(child => {
            const { id } = child;
            child.innerText = time[id];
        });

        // Stop the interval when time is up.
        if (distance <= 0) {
            clearInterval(this.interval);
        }

    };
    
    // Start the interval.
    this.interval = setInterval(count, 1000);

};

/**
 * Displays the current time.
 * 
 * @function    createClock
 * @returns     {void}
 */
export const createClock = function createClock() {

    // Check if there is already a counter running.
    if (this.interval !== null) {
        clearInterval(this.interval);
    }

    const container = this.shadowRoot.firstElementChild;
    const children = [...container.children];

    /**
     * Gets the current time and displays it in the time element.
     * 
     * @function    count
     * @returns     {void}
     */
    const count = () => {

        // Get the current time.
        const now = moment();

        // Format the time.
        const time = createTimeFormat(now);

        // Add the time to the right element.
        children.forEach(child => {
            const { id } = child;
            child.innerText = time[id];
        });
        
    }

    // Start the interval.
    this.interval = setInterval(count, 1000);

};