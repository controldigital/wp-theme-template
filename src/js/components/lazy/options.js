/**
 * @module		./components/lazy/options
 */

import { getElement } from 'Modules/tools.js';

/**
 * Creates an object with the attributes
 * of the this context. Used for the HTMLLazyElement.
 * 
 * @function	createOptions
 * @returns		{Object}
 */
export const createOptions = function createOptions() {

	// Create an options object.
	const options = {};

	// Get the element for the root, or pass null.
	if ('string' === typeof this.root) {
		if (this.root !== 'null') {
			options.root = getElement(this.root);
		} else {
			options.root = null;
		}
	}

	// If rootMaring is set use it.
	if ('string' === typeof this.rootMargin) {
		options.rootMargin = this.rootMargin;
	}

	// If threshold is set use it.
	if (this.threshold !== null) {
		options.threshold = this.threshold;
	}

	// Return the options.
	return options;

};