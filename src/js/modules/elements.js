/**
 * @module      ./modules/elements
 */

/**
 * This function accepts multiple types of a
 * selector argument to get the element from
 * the DOM or insert the element to use them.
 * The found element is then returned.
 * 
 * @function	getElement
 * 
 * @param		{(String|HTMLElement|Element)} selector String or the element itself.
 * @returns 	{(HTMLElement|Null)} Returns the element is found or null if not.
 */
export const getElement = (selector) => {
	if (typeof selector === 'undefined') {
		return null;
	}
	if (typeof selector === 'string') {
		return document.querySelector(selector);
	} else if (
		typeof selector === 'object' && (
		selector instanceof HTMLElement || 
		selector.nodeType === 1)
	) {
		return selector;
	} else {
		return null;
	}
};

/**
 * This function accepts multiple types of a
 * selector argument to get the elements from
 * the DOM or insert the elements to use them.
 * It returns the found elements in an Array.
 * 
 * @function	getElements
 * 
 * @param		{(String|HTMLCollection|NodeList|Array)} selector String or iterable object/array with the elements.
 * @returns		{(HTMLElement[]|[])} Returns an array with either the found elements or an empty array.
 */
export const getElements = (selector) => {
	if (typeof selector === 'undefined') {
		return [];
	} 
	if (typeof selector === 'string') {
		return [...document.querySelectorAll(selector)];
	} else if (
		typeof selector === 'object' && (
		selector instanceof HTMLCollection || 
		selector instanceof NodeList || 
		Array.isArray(selector))
	) {
		return [...selector];
	} else {
		return [];
	}
};

