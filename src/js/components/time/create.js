/**
 * @module      ./components/time/create
 */

import * as moment from 'moment';

/**
 * Creates countdown functionality to the time element.
 * 
 * @function    createCountdown
 * @param       {String} to ISO 8601 date string to count to.
 * @returns     {void}
 */
export const createCountdown = function createCountdown(to) {

    // Create moment instance for to time.
    const toMoment = moment(to);
    let interval;

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
        const time = {
            year: distance.format('YY'),
            month: distance.format('MM'),
            week: distance.format('WW'),
            days: distance.format('DD'),
            hours: distance.format('HH'),
            minutes: distance.format('mm'),
            seconds: distance.format('ss'),
        };

        // Add the time to the right element.
        for (let key in time) {
            const element = children.find(el => el.id === key);
            element.innerText = time[key];
        }

        // Stop the interval when time is up.
        if (distance <= 0) {
            clearInterval(interval);
        }

    };
    
    // Start the interval.
    interval = setInterval(count, 1000);

};

export const createClock = function createClock() {

};