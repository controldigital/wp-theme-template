/**
 * @module		./components/like/events
 */

import { 
	addIdToLocalStorage,
	removeIdFromLocalStorage
} from './storage.js';

/**
 * @function	onClick
 * @param 		{Event} event 
 * @returns		{void}
 */
export const onClick = function onClick({ target }) {
	if (this.clicked === null) {
		this.clicked = true;
		addIdToLocalStorage(this.name, this.value);
	} else {
		this.clicked = false;
		removeIdFromLocalStorage(this.name, this.value);
	}
};